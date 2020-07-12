import Achievement from "../types/Achievement";
import knex from "../../../../db/knex";

export default async (achievement: Omit<Achievement, "id">) => {
    return await knex<Achievement>("achievements").insert(achievement);
};
