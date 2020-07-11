import User from "../types/User";
import knex from "../../../../db/knex";

export default async <T extends keyof Omit<User, "password">>(
    property: T,
    value: User[T],
    country: string
) => {
    if (!property || !value || !country) return null;
    const result = await knex<User>("users")
        .select()
        .first()
        .where({ [property]: value })
        .update({ country: country });

    if (!result) return null;
};
