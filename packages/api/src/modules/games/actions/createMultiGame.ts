import Achievement from "../../achievements/types/Achievement";
import Game from "../types/Game";
import { highestGameId } from "./highestGameId";
import knex from "../../../../db/knex";
import findAchievementsByRequirement from "../../achievements/actions/findAchievementsByRequirement";
import userHasAchievement from "../../achievements/actions/userHasAchievement";
import { GamePlayer } from "../../websockets/gamesData";

export const createGames = async (players: GamePlayer[]): Promise<Game> => {
    const newHighestGame = (await highestGameId()) + 1;
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
                (j, idx) => !achievementMatches[idx]
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
