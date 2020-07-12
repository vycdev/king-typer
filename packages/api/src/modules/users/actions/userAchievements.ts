import User from "../types/User";
import knex from "../../../../db/knex";

export default async (id: number) => {
    const user = await knex<User>("users")
        .where({ id })
        .first();
    if (!user) {
        return null;
    }
    return user.achievements;
};
