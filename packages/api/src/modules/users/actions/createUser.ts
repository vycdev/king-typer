import knex from "../../../../db/knex";
import bcrypt from "bcrypt";

import User from "../types/User";

export const createUser = async (
    user: Pick<User, "email" | "name" | "password" | "country">
) => {
    const isTaken = Boolean(
        await knex<User>("users")
            .select("id")
            .where({ name: user.name || "" })
            .orWhere({ email: user.email || "" })
            .first()
    );
    if (isTaken) return null;
    const encryptedPassword = await bcrypt.hash(user.password, 12);
    return (
        await knex<User>("users").insert(
            {
                ...user,
                role: "member",
                password: encryptedPassword,
                exp: 0,
                tutorials: [],
                totaltests: 0,
                achievements: []
            },
            "*"
        )
    )[0];
};
