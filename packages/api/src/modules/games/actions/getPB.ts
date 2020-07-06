import PB from "../types/PB";
import knex from "../../../../db/knex";

export default async (userid: number) => {
    const pb = await knex<PB>("pbs")
        .where({ userid })
        .first();
    return pb ? pb : null;
};
