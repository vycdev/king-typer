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

    console.log(result, result.id);

    console.log(await knex<Game>("games").where({ userid: result.id }));

    const userGames = await knex<Game>("games").where({ userid: result.id });
    console.log("User games", userGames);
    return userGames;
};
