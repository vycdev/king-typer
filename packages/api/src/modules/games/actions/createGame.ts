import Game from "../types/Game";
import { highestGameId } from "./highestGameId";
import knex from "../../../../db/knex";

export const createGame = async (
    userid: number,
    wpm: number,
    rawwpm: number,
    accuracy: number
): Promise<Game> => {
    const newGame = {
        gameid: (await highestGameId()) + 1,
        userid,
        wpm,
        rawwpm,
        accuracy,
        date: Date.now()
    };
    return (await knex<Game>("games").insert(newGame, "*"))[0];
};
