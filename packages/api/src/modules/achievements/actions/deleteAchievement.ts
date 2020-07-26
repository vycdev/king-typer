import knex from "../../../../db/knex";

export default async (id: number) => {
    await knex("achievements")
        .delete()
        .where({ id });
};
