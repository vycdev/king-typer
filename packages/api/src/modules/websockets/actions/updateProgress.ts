import WebSocket from "ws";
import { games } from "../gamesData";
import gameFinished from "./gameFinished";
import HandlerResponse from "../types/HandlerResponse";

export default async (
    data: { key: number; progress: number },
    ws: WebSocket
): Promise<HandlerResponse> => {
    const gameWithKey = Object.values(games).find(l =>
        l.players.some(j => j.changeWSKey === data.key)
    );
    if (!gameWithKey) {
        return {
            category: "updateResponse",
            data: [
                {
                    client: ws,
                    data: {
                        success: false
                    }
                }
            ]
        };
    }
    gameWithKey.players.find(l => l.changeWSKey === data.key)!.progress =
        data.progress;
    await gameFinished(gameWithKey);
    return {
        category: "updateResponse",
        data: [
            {
                client: ws,
                data: {
                    success: true,
                    data: gameWithKey.players.map(l => ({
                        progress: l.progress,
                        resigned: l.resigned
                    }))
                }
            }
        ]
    };
};
