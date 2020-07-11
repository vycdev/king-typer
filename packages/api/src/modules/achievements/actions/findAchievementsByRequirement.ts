import Requirement from "../types/Requirement";
import knex from "../../../../db/knex";
import compareRequirements from "./compareRequirements";
import Achievement from "../types/Achievement";

export default async (requirements: Record<Requirement, number>) => {
    return (await knex<Achievement>("achievements")).filter(l =>
        compareRequirements(l.requirements, requirements)
    );
};
