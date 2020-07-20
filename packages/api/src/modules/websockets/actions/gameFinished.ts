import { Game } from "../gamesData";
import { createGames } from "../../games/actions/createMultiGame";
import { removeOldGame } from "../../games/actions/removeOldGame";
import knex from "../../../../db/knex";
import Text from "../../texts/types/Text";

export default async (game: Game) => {
    const text = await knex<Text>("texts")
        .where({ id: game.textid })
        .first();
    if (game.players.every(l => l.progress >= 100)) {
        await createGames(game.players, text!.difficulty);
        await Promise.all(game.players.map(l => removeOldGame(l.id)));
        return true;
    }
    return false;
};
