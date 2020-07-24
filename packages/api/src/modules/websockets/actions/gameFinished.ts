import { Game } from "../gamesData";
import { createGames } from "../../games/actions/createMultiGame";
import { removeOldGame } from "../../games/actions/removeOldGame";
import knex from "../../../../db/knex";
import Text from "../../texts/types/Text";

export default async (gameid: number, game: Game) => {
    const text = await knex<Text>("texts")
        .where({ id: game.textid })
        .first();

    const filteredPlayers = game.players.filter(
        l => l.id !== -1 && l.resigned !== true && l.progress >= 100
    );

    await createGames(gameid, filteredPlayers, text!.difficulty, text!.id);
    await Promise.all(filteredPlayers.map(l => removeOldGame(l.id)));
    return true;
};
