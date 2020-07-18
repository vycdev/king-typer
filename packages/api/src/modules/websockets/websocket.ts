import WebSocket from "ws";
import categoryParser from "./middleware/categoryParser";
import joinQueue from "./actions/joinQueue";
import leaveQueue from "./actions/leaveQueue";
import HandlerResponse from "./types/HandlerResponse";
import switchQueueLocation from "./actions/switchQueueLocation";
import updateProgress from "./actions/updateProgress";

const wsRoutes: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any, ws: WebSocket) => HandlerResponse | Promise<HandlerResponse>
> = {
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
        const { category: respCategory } = response;
        response.data.map(l => {
            l.client.send(
                JSON.stringify({ category: respCategory, data: l.data })
            );
        });
    }
};
