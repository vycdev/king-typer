import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("users", table => {
        table
            .integer("totaltests")
            .notNullable()
            .defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("users", table => {
        return table.dropColumn("totaltests");
    });
};
