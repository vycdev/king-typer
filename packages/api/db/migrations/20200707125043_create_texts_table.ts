import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("texts", table => {
        table.increments("id");
        table.string("text").notNullable();
        table.boolean("ordered");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("texts");
};
