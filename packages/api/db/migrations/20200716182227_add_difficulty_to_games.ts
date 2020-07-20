import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        table
            .integer("difficulty")
            .notNullable()
            .defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        return table.dropColumn("difficulty");
    });
};
