type Role = "none" | "member" | "admin";

export default interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    exp: number;
    role: Role;
    description?: string | null;
    tutorials: number[];
    achievements: number[];
    country: string;
    emailKey?: string;
}
