import Text from "../types/Text";
import knex from "../../../../db/knex";

export default async (ordered: boolean) => {
    if (ordered === true || ordered === false) {
        const texts = await knex<Text>("texts").where({
            ordered,
            tutorial: false
        });
        return texts[Math.floor(Math.random() * texts.length)];
    } else {
        const texts = await knex<Text>("texts").where({ tutorial: false });
        return texts[Math.floor(Math.random() * texts.length)];
    }
};
