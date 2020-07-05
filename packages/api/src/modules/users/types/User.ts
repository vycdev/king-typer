export default interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    rank: number;
    role?: string | null;
    description?: string | null;
}
