import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("pbs", table => {
        table
            .integer("difficulty")
            .notNullable()
            .defaultTo(0);
        table
            .integer("textid")
            .notNullable()
            .defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.alterTable("pbs", table => {
        table.dropColumn("difficulty");
        table.dropColumn("textid");
    });
};
