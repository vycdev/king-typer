import knex from "../../../../db/knex";
import Game from "../types/Game";

export const highestGameId = async () => {
    const games = await knex<Game>("games");
    const gameIds = games.map(l => l.gameid);
    const highestGameId = gameIds.length === 0 ? 1 : Math.max(...gameIds);
    return highestGameId;
};
