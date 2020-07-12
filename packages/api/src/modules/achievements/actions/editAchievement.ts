import Achievement from "../types/Achievement";
import knex from "../../../../db/knex";

export default async (id: number, details: Partial<Achievement>) => {
    const achievement = await knex<Achievement>("achievements")
        .where({ id })
        .first();
    if (!achievement) return null;
    await knex<Achievement>("achievements")
        .update(details)
        .where({ id });
    return true;
};
