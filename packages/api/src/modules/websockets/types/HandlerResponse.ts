import { Category } from "./Category";
import WebSocket from "ws";

interface HandlerUserData {
    client: WebSocket;
    data: unknown;
}

export default interface HandlerResponse {
    category: Category;
    data: HandlerUserData[];
}
