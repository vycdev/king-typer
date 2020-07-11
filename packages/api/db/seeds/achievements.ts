import Knex from "knex";

import achievements from "./examples/achievements";

export const seed = async (knex: Knex) => {
    await knex("achievements").del();

    return knex("achievements").insert(achievements);
};
