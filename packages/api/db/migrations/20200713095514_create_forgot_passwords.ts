import Knex from "knex";

export const up = async (knex: Knex) =>
    knex.schema.createTable("forgottenpasswords", table => {
        table.string("email").notNullable();
        table.string("key").notNullable();
        table.string("expiration").notNullable();
    });

export const down = async (knex: Knex) =>
    knex.schema.dropTable("forgottenpasswords");
