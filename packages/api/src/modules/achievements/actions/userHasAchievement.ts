import Achievement from "../types/Achievement";
import knex from "../../../../db/knex";
import User from "../../users/types/User";

export default async (userid: number, achievementid: number) => {
    const user = await knex<User>("users")
        .where({ id: userid })
        .first();
    const achievement = await knex<Achievement>("achievements")
        .where({ id: achievementid })
        .first();
    if (!user || !achievement) {
        return null;
    }
    return user.achievements.includes(achievement.id);
};
