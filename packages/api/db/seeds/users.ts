import Knex from "knex";

import users from "./examples/users";

export const seed = async (knex: Knex) => {
    await knex("users").del();
    return knex("users").insert(users);
};
