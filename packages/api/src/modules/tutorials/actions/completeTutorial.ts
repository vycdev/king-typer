import { Tutorial } from "../types/Tutorial";
import knex from "../../../../db/knex";
import User from "../../users/types/User";
import compareRequirements from "./compareRequirements";
import Requirement from "../types/Requirement";

export default async (
    tutorialid: number,
    userid: number,
    requirements: Record<Requirement, number>
) => {
    const tutorial = await knex<Tutorial>("texts")
        .where({
            id: tutorialid,
            tutorial: true
        })
        .first();
    const user = await knex<User>("users")
        .where({
            id: userid
        })
        .first();
    if (!tutorial || !user) return null;
    if (!compareRequirements(tutorial.requirements!, requirements)) {
        return false;
    }
    if (user.tutorials.includes(tutorialid)) {
        return false;
    }
    await knex("users")
        .update({
            tutorials: knex.raw("array_append(tutorials, ?)", [tutorialid])
        })
        .where({ id: userid });
    return true;
};
