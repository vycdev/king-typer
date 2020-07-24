import { queue, games, Difficulty } from "../gamesData";
import getRandomText from "../../texts/actions/getRandomText";
import HandlerResponse from "../types/HandlerResponse";

const newMaxId = () => {
    return Object.keys(games).length === 0
        ? 1
        : Math.max(...Object.keys(games).map(Number)) + 1;
};

const GameSize = 2;

export default async (
    category: Difficulty
): Promise<HandlerResponse | void> => {
    const currQueue = queue[category];
    if (currQueue.length >= GameSize) {
        const players = currQueue.slice(0, GameSize);
        for (let i = 0; i < GameSize; i++) {
            currQueue.shift();
        }
        const userGameKeys = Array(GameSize)
            .fill(null)
            .map(() => Math.floor(Math.random() * 899999) + 100000);
        const newGame = {
            players: players.map((l, idx) => ({
                ...l,
                progress: 0,
                resigned: false,
                gameKey: userGameKeys[idx],
                wpm: 0,
                rawwpm: 0,
                acc: 0
            })),
            textid: (await getRandomText(category != "easy")).id,
            endTime: Date.now() + 120000
        };
        const censoredGame = {
            textid: newGame.textid,
            players: newGame.players.map(l => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { gameKey, ws, ...data } = l;
                return data;
            })
        };
        games[newMaxId()] = newGame;
        return {
            category: "joinGame",
            data: players.map((l, idx) => ({
                client: l.ws!,
                data: {
                    key: newGame.players[idx].gameKey,
                    game: censoredGame
                }
            }))
        };
    }
};
