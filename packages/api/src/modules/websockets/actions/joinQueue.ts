import { queue } from "../gamesData";
import HandlerResponse from "../types/HandlerResponse";
import WebSocket from "ws";

export default (data: number, ws: WebSocket): HandlerResponse => {
    const changeWSKey = Math.floor(Math.random() * 899999) + 100000;
    queue.push({ id: data, ws, changeWSKey });
    return {
        category: "joinResponse",
        data: [{ client: ws, data: { success: true, changeWSKey } }]
    };
};
