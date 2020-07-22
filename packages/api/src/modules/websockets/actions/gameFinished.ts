import { Game, games } from "../gamesData";
import { createGames } from "../../games/actions/createMultiGame";
import { removeOldGame } from "../../games/actions/removeOldGame";
import knex from "../../../../db/knex";
import Text from "../../texts/types/Text";

export default async (gameid: string, game: Game) => {
    const text = await knex<Text>("texts")
        .where({ id: game.textid })
        .first();

    // TODO: When the time limit for the game is added in the ws call this when the time limit is reached not when there is a updateResponse.
    // Also use an array filter to filter the players that have 100 progress instead of checking if all of them have 100 progress
    // Also dont forget about the l.id to not be -1 because -1 is for guests and we cant add games to guests
    // Dont forget about checking if a player is already in the queue (putting this here because you might not see it elsewhere)

    if (game.players.every(l => l.progress >= 100 && l.id != -1)) {
        await createGames(game.players, text!.difficulty, text!.id);
        await Promise.all(game.players.map(l => removeOldGame(l.id)));
        delete games[gameid];
        return true;
    }
    return false;
};
