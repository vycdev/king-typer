import WebSocket from "ws";
import { queue } from "../gamesData";

export default (data: number, ws: WebSocket) => {
    const queueling = queue.find(l => l.changeWSKey === data);
    if (!queueling) {
        return false;
    }
    queueling.ws = ws;
    return true;
};
