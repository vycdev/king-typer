import WebSocket from "ws";

interface Queueling {
    id: number;
    ws: WebSocket | null;
    key: number;
}

export type GamePlayer = Queueling & {
    progress: number;
    resigned: boolean;
    gameKey: number;
    wpm: number;
    rawwpm: number;
    acc: number;
};

export interface Game {
    players: GamePlayer[];
    textid: number;
    endTime: number;
}

export type Difficulty = "easy" | "normal";

export const games: Record<number, Game> = {};

export const queue: Record<Difficulty, Queueling[]> = { easy: [], normal: [] };
