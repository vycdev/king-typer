import { Tutorial } from "../types/Tutorial";
import knex from "../../../../db/knex";

export default async (id: number) => {
    const tutorial = await knex<Tutorial>("texts")
        .where({ id, tutorial: true })
        .first();
    return tutorial || null;
};
