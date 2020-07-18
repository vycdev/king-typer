import { queue } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";
import WebSocket from "ws";
import processQueue from "./processQueue";

export default (data: number, ws: WebSocket): HandlerResponse => {
    const key = Math.floor(Math.random() * 899999) + 100000;
    queue.push({ id: data, ws, key });
    processQueue();
    return {
        category: "joinResponse",
        data: [{ client: ws, data: { success: true, key } }]
    };
};
