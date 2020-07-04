export default interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    role?: string | null;
    description?: string | null;
}
