import Requirement from "../types/Requirement";
import knex from "../../../../db/knex";
import compareRequirements from "./compareRequirements";

export default async (requirements: Record<Requirement, number>) => {
    return (await knex<Achievement>("achievements")).filter(l =>
        compareRequirements(l.requirements, requirements)
    );
};
