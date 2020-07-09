import { Tutorial } from "../types/Tutorial";
import knex from "../../../../db/knex";

export default async () => {
    const tutorials = await knex<Tutorial>("texts").where({ tutorial: true });
    return tutorials;
};
