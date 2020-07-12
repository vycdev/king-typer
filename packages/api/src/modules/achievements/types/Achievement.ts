import Requirement from "./Requirement";

export default interface Achievement {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    requirements: Record<Requirement, number>;
}
