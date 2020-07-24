export type ResponseCategory =
    | "ping"
    | "joinResponse"
    | "leaveResponse"
    | "switchQueueResponse"
    | "updateResponse";

export type IncomingCategory =
    | "ping"
    | "joinQueue"
    | "leaveQueue"
    | "switchQueueLocation"
    | "updateProgress";

export const sendWebsocket = (
    socket: WebSocket,
    category: IncomingCategory,
    data: unknown
) => {
    if (socket.readyState === socket.OPEN) {
        const stringified = JSON.stringify({ category, data });
        socket.send(stringified);
    }
};

export const websocketParser = JSON.parse;
