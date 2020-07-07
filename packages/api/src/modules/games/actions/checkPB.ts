import Game from "../types/Game";
import knex from "../../../../db/knex";
import PB from "../types/PB";

export default async (rawGame: Game) => {
    const { gameid: _, ...game } = rawGame;
    const playerPBs = await knex<PB>("pbs").where({ userid: game.userid });
    if (playerPBs.length === 0) {
        await knex<PB>("pbs").insert(game);
        return true;
    }
    const playerPB = playerPBs.reduce((acc, cur) =>
        acc.wpm > cur.wpm ? acc : cur
    );
    if (game.wpm > playerPB.wpm) {
        await knex<PB>("pbs").insert(game);
        return true;
    }
    return false;
};
