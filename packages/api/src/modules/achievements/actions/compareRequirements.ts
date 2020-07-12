import Requirement from "../types/Requirement";

const typesafeKeys = Object.keys as <T extends object>(o: T) => Array<keyof T>;

export default (
    base: Record<Requirement, number>,
    head: Record<Requirement, number>
) => {
    return typesafeKeys(base)
        .map(l => [base[l], head[l]])
        .every(l => l[1] > l[0]);
};
