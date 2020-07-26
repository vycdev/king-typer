import Game from "../types/Game";
import knex from "../../../../db/knex";

export default async () => {
    const games = await knex<Game>("games");
    return games;
};
