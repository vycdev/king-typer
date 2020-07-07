import PB from "../types/PB";
import knex from "../../../../db/knex";

export default async (userid: number) => {
    const pbs = await knex<PB>("pbs").where({ userid });
    return pbs.length !== 0 ? pbs.sort((a, b) => a.wpm - b.wpm) : null;
};
