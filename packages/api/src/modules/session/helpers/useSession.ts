import Koa from "koa";

import session from "koa-session";

import { getCookie } from "../actions/getCookie";
import { setCookie } from "../actions/setCookie";
import { destroyCookie } from "../actions/destroyCookie";

export const config: Readonly<Partial<session.opts>> = {
    store: {
        get: getCookie,
        set: setCookie,
        destroy: destroyCookie
    },
    key: "api:sess",
    maxAge: 86400000,
    httpOnly: true,
    renew: true,
    signed: false
};

export const useSession = (app: Koa) => session(config, app);
