import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("achievements", table => {
        table.increments("id");
        table.string("name");
        table.string("description");
        table.integer("difficulty");
        table.jsonb("requirements");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("achievements");
};
