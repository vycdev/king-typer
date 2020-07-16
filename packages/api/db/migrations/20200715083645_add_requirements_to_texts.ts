import Knex from "knex";

export const up = async (knex: Knex) =>
    knex.schema.table("texts", table => table.jsonb("requirements"));

export const down = async (knex: Knex) =>
    knex.schema.table("texts", table => table.dropColumn("requirements"));
