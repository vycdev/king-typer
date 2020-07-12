import Achievement from "../types/Achievement";
import knex from "../../../../db/knex";

export default async () => {
    return await knex<Achievement>("achievements");
};
