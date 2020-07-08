import { Tutorial } from "../types/Tutorial";
import knex from "../../../../db/knex";
import User from "../../users/types/User";

export default async (tutorialid: number, userid: number) => {
    const tutorial = await knex<Tutorial>("texts")
        .where({
            id: tutorialid,
            tutorial: true
        })
        .first();
    console.log(tutorial);
    const user = await knex<User>("users")
        .where({
            id: userid
        })
        .first();
    if (!tutorial || !user) return false;
    await knex("users")
        .update({
            tutorials: knex.raw("array_append(tutorials, ?)", [tutorialid])
        })
        .where({ id: userid });
    return true;
};
