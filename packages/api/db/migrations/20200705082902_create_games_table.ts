import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("games", table => {
        table.integer("gameid").notNullable();
        table.integer("userid").notNullable();
        table.bigInteger("date").notNullable();
        table.integer("wpm").notNullable();
        table.integer("rawwpm").notNullable();
        table.integer("accuracy").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("games");
};
