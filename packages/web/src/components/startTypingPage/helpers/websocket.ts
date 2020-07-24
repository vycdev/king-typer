// import { setWsHeartbeat } from "ws-heartbeat/client";
import { wsUrl } from "../../../utils/constants";

// eslint-disable-next-line no-undef
export const CreateNewWS = () => new WebSocket(wsUrl);
