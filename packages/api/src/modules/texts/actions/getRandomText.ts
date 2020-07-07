import Text from "../types/Text";
import knex from "../../../../db/knex";

export default async (typed = false, ordered = false) => {
    if (typed) {
        return await knex<Text>("texts").where({ ordered });
    } else {
        return await knex<Text>("texts");
    }
};
