import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("users", table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("description");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("users");
};
