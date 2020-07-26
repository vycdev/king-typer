import User from "../types/User";
import knex from "../../../../db/knex";

export default async (userid: number, role: User["role"]) => {
    const user = await knex<User>("users")
        .where({ id: userid })
        .first();
    if (!user) return null;
    return knex<User>("users")
        .update({ role })
        .where({ id: userid });
};
