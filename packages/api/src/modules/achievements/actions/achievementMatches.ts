import Achievement from "../types/Achievement";
import Requirement from "../types/Requirement";
import knex from "../../../../db/knex";
import compareRequirements from "./compareRequirements";

export default async (
    id: number,
    requirements: Record<Requirement, number>
) => {
    const achievement = await knex<Achievement>("achievements")
        .where({ id })
        .first();
    if (!achievement) {
        return null;
    }
    return compareRequirements(achievement.requirements, requirements);
};
