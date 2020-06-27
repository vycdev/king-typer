import knex from "../../../../db/knex";

import { Session } from "../types/Session";

export const destroyCookie = async (key: Session["key"]) =>
    knex<Session>("sessions")
        .where({ key })
        .del("*");
