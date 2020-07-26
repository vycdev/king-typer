import User from "../types/User";
import Game from "../../games/types/Game";
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

    const userGames = await knex<Game>("games").where({ userid: result.id });
    return userGames;
};
