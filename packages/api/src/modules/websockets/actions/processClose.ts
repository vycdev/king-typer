import WebSocket from "ws";
import { queue, games } from "../gamesData";

export default (ws: WebSocket) => {
    Object.values(queue).map(l => {
        if (l.map(j => j.ws).includes(ws)) {
            l.splice(l.map(j => j.ws).indexOf(ws), 1);
        }
    });
    Object.values(games).map(l => {
        const { players } = l;
        if (players.map(j => j.ws).includes(ws)) {
            players.find(j => j.ws === ws)!.resigned = true;
        }
    });
};
