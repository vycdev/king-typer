import PB from "../types/PB";
import knex from "../../../../db/knex";

export default async (userid: number) => {
    const pb = await knex<PB>("pbs").where({ userid });
    return pb.length !== 0 ? pb.sort((a, b) => a.wpm - b.wpm) : null;
};
