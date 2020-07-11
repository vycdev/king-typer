import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("achievements", table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.integer("difficulty").notNullable();
        table.jsonb("requirements").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("achievements");
};
