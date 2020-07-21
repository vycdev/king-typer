import WebSocket from "ws";
import { queue } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";

export default (data: number, ws: WebSocket): HandlerResponse[] => {
    const queueling =
        queue.easy.find(l => l.key === data) ||
        queue.normal.find(l => l.key === data);
    if (!queueling) {
        return [
            {
                category: "switchQueueResponse",
                data: [{ client: ws, data: { success: false } }]
            }
        ];
    }
    queueling.ws = ws;
    return [
        {
            category: "switchQueueResponse",
            data: [{ client: ws, data: { success: true } }]
        }
    ];
};
