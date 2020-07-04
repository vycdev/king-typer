import knex from "../../../../db/knex";
import bcrypt from "bcrypt";

import User from "../types/User";

export const createUser = async (
    user: Pick<User, "email" | "username" | "password">
) => {
    const isTaken = Boolean(
        await knex<User>("users")
            .select("id")
            .where({ username: user.username })
            .orWhere({ email: user.email })
            .first()
    );
    if (isTaken) return null;
    const encryptedPassword = await bcrypt.hash(user.password, 12);
    return (
        await knex<User>("users").insert(
            {
                ...user,
                password: encryptedPassword
            },
            "*"
        )
    )[0];
};
