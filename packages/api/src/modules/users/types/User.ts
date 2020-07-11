export default interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    exp: number;
    role?: string | null;
    description?: string | null;
    tutorials: number[];
    country: string;
}
