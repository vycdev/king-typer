import knex from "../../../../db/knex";
import Text from "../types/Text";

export default async (
    text: string,
    difficulty: number,
    author: number,
    ordered = true,
    tutorial = false
) => {
    await knex<Text>("texts").insert({
        text,
        difficulty,
        author,
        ordered,
        tutorial
    });
};
