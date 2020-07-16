import knex from "../../../../db/knex";

export default async (id: number) => {
    await knex("users")
        .delete()
        .where({ id });
};
