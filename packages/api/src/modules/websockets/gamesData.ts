import WebSocket from "ws";

interface Queueling {
    id: number;
    ws: WebSocket | null;
}

export const games = {};

export const queue: Queueling[] = [];
