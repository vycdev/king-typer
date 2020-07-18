export const sendWebsocket = (
    socket: WebSocket,
    category: string,
    data: unknown
) => {
    const stringified = JSON.stringify({ category, data });
    socket.send(stringified);
};

export const websocketParser = JSON.parse;
