import { Game } from "../gamesData";
import { createGames } from "../../games/actions/createMultiGame";
import { removeOldGame } from "../../games/actions/removeOldGame";

export default async (game: Game) => {
    if (game.players.every(l => l.progress >= 100)) {
        await createGames(game.players);
        await Promise.all(game.players.map(l => removeOldGame(l.id)));
    }
};
