export interface Session {
    id: number;
    key: string;
    maxAge: number;
    session: {
        user: number;
        _expire: number;
        _maxAge: number;
    };
}
