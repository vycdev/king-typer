import { queue } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";
import WebSocket from "ws";

export default (
    data: number,
    ws: WebSocket,
    _: WebSocket.Server
): HandlerResponse => {
    queue.push({ id: data, ws });
    return {
        category: "joinResponse",
        data: [{ client: ws, data: "Successfully joined queue" }]
    };
};
