import knex from "../../../../db/knex";

import User from "../types/User";

export const verifyUserEmail = async (userid: User["id"], emailKey: string) => {
    userid = Number(userid);
    const result = await knex<User>("users")
        .where({
            id: userid,
            role: "unverified",
            emailKey
        })
        .first();
    if (!result) return null;
    return knex<User>("users")
        .update({ role: "member" })
        .where({ id: userid });
};
