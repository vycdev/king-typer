import knex from "../../../../db/knex";

import User from "../types/User";

export default async <T extends keyof Omit<User, "password">>(
    property: T,
    value: User[T]
) => {
    if (!property || !value) return null;
    const result = await knex<User>("users")
        .select()
        .first()
        .where({ [property]: value });
    if (!result) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, emailKey, ...data } = result;

    return data;
};
