import WebSocket from "ws";
import { games } from "../gamesData";
import gameFinished from "./gameFinished";
import HandlerResponse from "../types/HandlerResponse";

export default async (
    data: {
        key: number;
        progress: number;
        wpm: number;
        rawwpm: number;
        acc: number;
    },

    ws: WebSocket
): Promise<HandlerResponse[]> => {
    const gameWithKey = Object.values(games).find(l =>
        l.players.some(j => j.key === data.key)
    );
    if (!gameWithKey) {
        return [
            {
                category: "updateResponse",
                data: [
                    {
                        client: ws,
                        data: {
                            success: false
                        }
                    }
                ]
            }
        ];
    }
    const player = gameWithKey.players.find(l => l.key === data.key);
    Object.assign(player, data);
    await gameFinished(gameWithKey);
    return [
        {
            category: "updateResponse",
            data: [
                {
                    client: ws,
                    data: {
                        success: true,
                        data: gameWithKey.players.map(l => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { key, ws, gameKey, ...data } = l;
                            return data;
                        })
                    }
                }
            ]
        }
    ];
};
