import { queue, games } from "../gamesData";
import getRandomText from "../../texts/actions/getRandomText";

const newMaxId = () => {
    return Object.keys(games).length === 0
        ? 1
        : Math.max(...Object.keys(games).map(Number)) + 1;
};

export default async () => {
    if (queue.length >= 4) {
        const players = queue.slice(0, 4);
        for (let i = 0; i < 4; i++) {
            queue.shift();
        }
        const userGameKeys = Array(4)
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
            textid: (await getRandomText(false)).id
        };
        games[newMaxId()] = newGame;
        return {
            category: "joinGame",
            data: players.map((l, idx) => ({
                client: l.ws,
                data: newGame.players[idx].gameKey
            }))
        };
    }
};
