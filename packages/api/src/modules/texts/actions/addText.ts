import knex from "../../../../db/knex";
import Text from "../types/Text";

export default async (text: string, ordered = true) => {
    await knex<Text>("texts").insert({ text, ordered });
};
