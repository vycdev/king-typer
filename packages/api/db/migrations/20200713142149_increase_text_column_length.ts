import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("texts", table => {
        table
            .string("text", 2000)
            .notNullable()
            .alter();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.alterTable("texts", table => {
        return table.string("text", 255).alter();
    });
};
