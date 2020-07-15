import knex from "../../../../db/knex";
import Text from "../types/Text";

export default async (
    title: string,
    text: string,
    difficulty: number,
    author: number,
    ordered = true,
    tutorial = false,
    requirements
) => {
    await knex<Text>("texts").insert({
        title,
        text,
        difficulty,
        author,
        ordered,
        tutorial,
        requirements
    });
};
