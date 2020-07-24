import PB from "../types/PB";
import knex from "../../../../db/knex";

export default async () => {
    const games = await knex<PB>("pbs");
    return games;
};
