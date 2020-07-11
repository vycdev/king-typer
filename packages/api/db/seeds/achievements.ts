import Knex from "knex";

import achievements from "./examples/users";

export const seed = async (knex: Knex) => {
    await knex("achievements").del();

    return knex("users").insert(achievements);
};
