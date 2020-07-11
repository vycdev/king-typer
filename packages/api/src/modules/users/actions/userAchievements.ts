import User from "../types/User";
import knex from "../../../../db/knex";

export default async (id: number) => {
    console.log(await knex<User>("users"));
    const user = await knex<User>("users")
        .where({ id })
        .first();
    if (!user) {
        return null;
    }
    return user.achievements;
};
