export type ResponseCategory =
    | "ping"
    | "joinResponse"
    | "leaveResponse"
    | "joinGame"
    | "switchQueueResponse"
    | "updateResponse";

export type IncomingCategory =
    | "ping"
    | "joinQueue"
    | "leaveQueue"
    | "switchQueueLocation"
    | "updateProgress";
