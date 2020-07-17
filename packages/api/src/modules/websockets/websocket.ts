import WebSocket from "ws";
import categoryParser from "./middleware/categoryParser";

export default (wss: WebSocket.Server, ws: WebSocket, message: string) => {
    const { category, data } = categoryParser(message.toString());
};
