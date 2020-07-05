import Knex from "knex";
import bcrypt from "bcrypt";

import users from "./examples/users";

export const seed = async (knex: Knex) => {
    await knex("users").del();

    const hashedUsers: typeof users = await Promise.all(
        users.map(async u => ({
            ...u,
            password: await bcrypt.hash(u.password, 12)
        }))
    );

    return knex("users").insert(hashedUsers);
};
