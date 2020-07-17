import WebSocket from "ws";
import categoryParser from "./middleware/categoryParser";
import joinQueue from "./actions/joinQueue";
import leaveQueue from "./actions/leaveQueue";
import HandlerResponse from "./types/HandlerResponse";

const wsRoutes: Record<
    string,
    (data: any, ws: WebSocket) => HandlerResponse
> = {
    joinQueue,
    leaveQueue
};

export default (wss: WebSocket.Server, ws: WebSocket, message: string) => {
    const { category, data } = categoryParser(message.toString());
    if (Object.keys(wsRoutes).includes(category)) {
        const response = wsRoutes[category](data, ws);
        const { category: respCategory } = response;
        response.data.map(l => {
            l.client.send(
                JSON.stringify({ category: respCategory, data: l.data })
            );
        });
    }
};
