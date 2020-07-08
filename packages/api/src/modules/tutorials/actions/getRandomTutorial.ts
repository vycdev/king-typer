import Text from "../../texts/types/Text";
import knex from "../../../../db/knex";

export default async () => {
    const texts = await knex<Text>("texts").where({
        tutorial: true
    });
    return texts[Math.floor(Math.random() * texts.length)];
};
