import { queue, Difficulty } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";
import WebSocket from "ws";
import processQueue from "./processQueue";

export default (
    data: { id: number; difficulty: Difficulty },
    ws: WebSocket
): HandlerResponse => {
    const key = Math.floor(Math.random() * 899999) + 100000;
    queue[data.difficulty].push({ id: data.id, ws, key });
    processQueue(data.difficulty);
    return {
        category: "joinResponse",
        data: [{ client: ws, data: { success: true, key } }]
    };
};
