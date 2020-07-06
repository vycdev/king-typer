import Game from "../types/Game";
import knex from "../../../../db/knex";
import PB from "../types/PB";

export default async (game: Game) => {
    const playerPB = await knex<PB>("pbs")
        .where({ userid: game.userid })
        .first();
    if (!playerPB) {
        const { gameid: _, ...gameData } = game;
        await knex<PB>("pbs").insert(gameData);
        return true;
    }
    if (game.wpm > playerPB.wpm) {
        await knex<PB>("pbs")
            .delete()
            .where({ userid: game.userid });
        await knex<PB>("pbs").insert(game);
        return true;
    }
    return false;
};
