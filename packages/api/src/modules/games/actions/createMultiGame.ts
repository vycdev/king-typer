import Achievement from "../../achievements/types/Achievement";
import Game from "../types/Game";
import knex from "../../../../db/knex";
import findAchievementsByRequirement from "../../achievements/actions/findAchievementsByRequirement";
import userHasAchievement from "../../achievements/actions/userHasAchievement";
import { GamePlayer } from "../../websockets/gamesData";

export const createGames = async (
    gameid: number,
    players: GamePlayer[],
    difficulty: number,
    textid: number
): Promise<Game> => {
    const newGames: Game[] = (
        await Promise.all(
            players.map(async l => {
                const existingGame = await knex("games")
                    .where({
                        gameid,
                        userid: l.id
                    })
                    .first();

                if (!existingGame) {
                    return undefined;
                }

                const newGame = {
                    gameid,
                    userid: l.id,
                    wpm: l.wpm,
                    rawwpm: l.rawwpm,
                    accuracy: l.acc,
                    difficulty,
                    textid,
                    date: Date.now()
                };

                const user = await knex("users")
                    .where({ id: l.id })
                    .first();

                await knex("users")
                    .where({ id: l.id })
                    .update({
                        totaltests: user.totaltests ? user.totaltests + 1 : 1,
                        exp: user.exp + (difficulty * l.wpm) / 10
                    });

                const possibleAchievements: Achievement[] = await findAchievementsByRequirement(
                    {
                        wpm: l.wpm,
                        rawwpm: l.rawwpm,
                        acc: l.acc
                    }
                );
                const achievementMatches = await Promise.all(
                    possibleAchievements.map(j =>
                        userHasAchievement(l.id, j.id)
                    )
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
        )
    ).filter((l): l is Game => !!l);
    return (await knex<Game>("games").insert(newGames, "*"))[0];
};
