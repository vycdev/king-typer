import Achievement from "../../achievements/types/Achievement";
import Game from "../types/Game";
import { highestGameId } from "./highestGameId";
import knex from "../../../../db/knex";
import findAchievementsByRequirement from "../../achievements/actions/findAchievementsByRequirement";
import userHasAchievement from "../../achievements/actions/userHasAchievement";
import { GamePlayer } from "../../websockets/gamesData";

export const createGames = async (
    players: GamePlayer[],
    difficulty: number
): Promise<Game> => {
    const newHighestGame = (await highestGameId()) + 1;
    const sortedPlayers = players
        .sort((a, b) => a.wpm - b.wpm)
        .reduce((acc, cur, idx, arr) => ({
            ...acc,
            [cur.id]: arr.length - idx
        }));
    const newGames = await Promise.all(
        players.map(async l => {
            const newGame = {
                gameid: newHighestGame,
                id: l.id,
                wpm: l.wpm,
                rawwpm: l.rawwpm,
                acc: l.acc,
                date: Date.now()
            };

            const user = await knex("users")
                .where({ id: l.id })
                .first();

            await knex("users")
                .where({ id: l.id })
                .update({
                    totaltests: user.totaltests ? user.totaltests + 1 : 1,
                    exp: Math.floor(
                        (user.exp + (l.wpm * difficulty) / 10) *
                            ((1 + sortedPlayers[l.id]) / 10)
                    )
                });

            const possibleAchievements: Achievement[] = await findAchievementsByRequirement(
                {
                    wpm: l.wpm,
                    rawwpm: l.rawwpm,
                    acc: l.acc
                }
            );
            const achievementMatches = await Promise.all(
                possibleAchievements.map(j => userHasAchievement(l.id, j.id))
            );
            const achievements = possibleAchievements.filter(
                (_, idx) => !achievementMatches[idx]
            );
            achievements.map(async j => {
                await knex("users")
                    .update({
                        achievements: knex.raw(
                            "array_append(achievements, ?)",
                            [j.id]
                        )
                    })
                    .where({ id: l.id });
            });
            return newGame;
        })
    );
    return (await knex<Game>("games").insert(newGames, "*"))[0];
};
