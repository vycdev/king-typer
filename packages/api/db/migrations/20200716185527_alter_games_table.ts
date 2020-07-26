import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        table
            .float("wpm")
            .notNullable()
            .alter();
        table
            .float("rawwpm")
            .notNullable()
            .alter();
        table
            .float("accuracy")
            .notNullable()
            .alter();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        table
            .integer("wpm")
            .notNullable()
            .alter();
        table
            .integer("rawwpm")
            .notNullable()
            .alter();
        table
            .integer("accuracy")
            .notNullable()
            .alter();
    });
};
