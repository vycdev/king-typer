import Achievement from "../../achievements/types/Achievement";
import Game from "../types/Game";
import { highestGameId } from "./highestGameId";
import knex from "../../../../db/knex";
import findAchievementsByRequirement from "../../achievements/actions/findAchievementsByRequirement";
import userHasAchievement from "../../achievements/actions/userHasAchievement";

export const createGame = async (
    userid: number,
    wpm: number,
    rawwpm: number,
    accuracy: number
): Promise<Game> => {
    const newGame = {
        gameid: (await highestGameId()) + 1,
        userid,
        wpm,
        rawwpm,
        accuracy,
        date: Date.now()
    };
    const possibleAchievements: Achievement[] = await findAchievementsByRequirement(
        {
            wpm,
            rawwpm,
            acc: accuracy
        }
    );
    const achievements = possibleAchievements.filter(
        l => !userHasAchievement(userid, l.id)
    );
    achievements.map(async l => {
        await knex("users")
            .update({
                achievements: knex.raw("array_append(achievements, ?)", [l.id])
            })
            .where({ id: userid });
    });
    return (await knex<Game>("games").insert(newGame, "*"))[0];
};
