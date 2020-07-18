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
