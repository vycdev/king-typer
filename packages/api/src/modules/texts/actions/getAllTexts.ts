import Text from "../types/Text";
import knex from "../../../../db/knex";

export default async () => {
    return await knex<Text>("texts");
};
