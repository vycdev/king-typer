import knex from "../../../../db/knex";

import User from "../types/User";

export default async <T extends keyof Omit<User, "password">>(
    property: T,
    id: number,
    newValue: User[T]
) => {
    if (!property || !id || !newValue) return null;
    const result = await knex<User>("users")
        .select()
        .first()
        .where({ id })
        .update({ [property]: newValue });
    if (!result) return null;

    return result;
};
