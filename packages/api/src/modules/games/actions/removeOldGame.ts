import Game from "../types/Game";
import knex from "../../../../db/knex";

export const removeOldGame = async (userid: number): Promise<void> => {
    const userGames = await knex<Game>("games").where({ userid });
    if (userGames.length >= 11) {
        const removalGames = userGames.slice(0, -10);
        for (const game of removalGames) {
            await knex<Game>("games")
                .delete()
                .where({ gameid: game.gameid });
        }
    }
};
