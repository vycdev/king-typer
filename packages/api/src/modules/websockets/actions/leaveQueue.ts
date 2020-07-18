import { queue } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";
import WebSocket from "ws";

export default (data: number, ws: WebSocket): HandlerResponse => {
    queue.splice(queue.findIndex(l => l.id === data));
    return {
        category: "leaveResponse",
        data: [{ client: ws, data: { success: true } }]
    };
};
