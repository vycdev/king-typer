import WebSocket from "ws";

interface Queueling {
    id: number;
    ws: WebSocket | null;
    changeWSKey: number;
}

export const games = {};

export const queue: Queueling[] = [];
