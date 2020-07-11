import User from "../types/User";
import knex from "../../../../db/knex";

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

    const userCountry = result.country;
    return userCountry;
};
