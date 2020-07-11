import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("users", table => {
        table.specificType("achievements", "INT[]").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("users", table => {
        return table.dropColumn("achievements");
    });
};
