import knex from "../../../../db/knex";
import bcrypt from "bcrypt";

import User from "../types/User";

const genNewKey = () =>
    Array(16)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(_ =>
            Math.random()
                .toString(36)
                .charAt(2)
        )
        .join("");

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
                role: "unverified",
                password: encryptedPassword,
                exp: 0,
                tutorials: [],
                emailKey: genNewKey(),
                totaltests: 0,
                achievements: []
            },
            "*"
        )
    )[0];
};
