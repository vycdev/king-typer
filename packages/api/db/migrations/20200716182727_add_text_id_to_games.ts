import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        table
            .integer("textid")
            .notNullable()
            .defaultTo(11);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.alterTable("games", table => {
        return table.dropColumn("textid");
    });
};
