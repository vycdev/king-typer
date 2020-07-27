type Role = "unverified" | "member" | "admin";

export interface User {
    id: number;
    email: string;
    name: string;
    exp: number;
    role: Role;
    description?: string | null;
    tutorials: number[];
    achievements: number[];
    country: string;
    totaltests: number;
}

export interface AllUser extends User {
    emailKey?: string;
}

type Requirement = "wpm" | "acc";

export interface Text {
    id: number;
    title: string;
    text: string;
    ordered: boolean;
    tutorial: boolean;
    difficulty: number;
    author: number;
    requirements?: Record<Requirement, number>;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    requirements: Record<Requirement, number>;
}
