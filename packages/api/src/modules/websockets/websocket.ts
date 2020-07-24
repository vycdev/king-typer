import WebSocket from "ws";
import categoryParser from "./middleware/categoryParser";
import joinQueue from "./actions/joinQueue";
import leaveQueue from "./actions/leaveQueue";
import HandlerResponse from "./types/HandlerResponse";
import switchQueueLocation from "./actions/switchQueueLocation";
import updateProgress from "./actions/updateProgress";
import { Difficulty } from "./gamesData";

type WsRoutes<T> = {
    [K in keyof T]?: (
        data: T[K],
        ws: WebSocket
    ) => HandlerResponse[] | Promise<HandlerResponse[]>;
};

interface WsRoutesData {
    joinQueue: { id: number; difficulty: Difficulty };
    leaveQueue: number;
    switchQueueLocation: number;
    updateProgress: {
        key: number;
        progress: number;
        wpm: number;
        rawwpm: number;
        acc: number;
    };
}

const wsRoutes: WsRoutes<WsRoutesData> = {
    joinQueue,
    leaveQueue,
    switchQueueLocation,
    updateProgress
};

export default async (
    wss: WebSocket.Server,
    ws: WebSocket,
    message: string
) => {
    const { category, data } = categoryParser(message.toString());
    if (Object.keys(wsRoutes).includes(category)) {
        const response = await wsRoutes[category](data, ws);
        response.map(j => {
            const { category: respCategory } = j;
            j.data.map((l: HandlerResponse["data"][0]) => {
                l.client.send(
                    JSON.stringify({
                        category: respCategory,
                        data: l.data
                    })
                );
            });
        });
    }
};
