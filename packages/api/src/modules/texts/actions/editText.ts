import knex from "../../../../db/knex";

import Text from "../types/Text";

export default async <T extends keyof Text>(
    property: T,
    id: number,
    newValue: Text[T]
) => {
    if (!property || !id || newValue === undefined) return null;
    const result = await knex<Text>("texts")
        .select()
        .first()
        .where({ id })
        .update({ [property]: newValue });
    if (!result) return null;

    return result;
};
