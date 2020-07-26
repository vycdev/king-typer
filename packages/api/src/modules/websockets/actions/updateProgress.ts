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
    const gameWithKey = Object.entries(games).find(l =>
        l[1].players.some(j => j.key === data.key)
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
    const player = gameWithKey[1].players.find(l => l.key === data.key);
    Object.assign(player, data);
    await gameFinished((gameWithKey[0] as unknown) as number, gameWithKey[1]);
    return [
        {
            category: "updateResponse",
            data: [
                {
                    client: ws,
                    data: {
                        success: true,
                        data: gameWithKey[1].players.map(l => {
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
