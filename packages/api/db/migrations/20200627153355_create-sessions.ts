import Knex from "knex";

export const up = async (knex: Knex) =>
    knex.schema.createTable("sessions", table => {
        table.increments("id");
        table.string("key").notNullable();
        table.integer("maxAge").notNullable();
        table.json("session").notNullable();
    });

export const down = async (knex: Knex) => knex.schema.dropTable("sessions");
