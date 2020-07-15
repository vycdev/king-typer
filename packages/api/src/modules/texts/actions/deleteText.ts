import knex from "../../../../db/knex";

export default async (id: number) => {
    await knex("texts")
        .delete()
        .where({ id });
};
