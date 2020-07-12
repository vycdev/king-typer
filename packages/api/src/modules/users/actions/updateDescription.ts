import User from "../types/User";
import knex from "../../../../db/knex";

export default async <T extends keyof Omit<User, "password">>(
    property: T,
    value: User[T],
    description: string
) => {
    if (!property || !value || !description) return null;
    const result = await knex<User>("users")
        .select()
        .first()
        .where({ [property]: value })
        .update({ description: description });

    if (!result) return null;
};
