import Text from "../types/Text";
import knex from "../../../../db/knex";

export default async (typed = false, ordered = false) => {
    if (typed) {
        const texts = await knex<Text>("texts").where({ ordered });
        return texts[Math.floor(Math.random() * texts.length)];
    } else {
        const texts = await knex<Text>("texts");
        return texts[Math.floor(Math.random() * texts.length)];
    }
};
