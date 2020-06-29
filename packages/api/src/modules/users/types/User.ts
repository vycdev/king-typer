export default interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    role?: string | null;
    description?: string | null;
}
