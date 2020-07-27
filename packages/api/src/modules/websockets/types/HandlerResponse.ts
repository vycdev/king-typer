import { ResponseCategory } from "./Category";
import WebSocket from "ws";

interface HandlerUserData {
    client: WebSocket;
    data: unknown;
}

export default interface HandlerResponse {
    category: ResponseCategory;
    data: HandlerUserData[];
}
