interface Users {
    name: string;
    email: string;
    password: string;
    role?: string | null;
    description?: string | null;
    rank: number;
}

export default [
    {
        name: "UserUser",
        email: "UserUser@fake.com",
        password: "UserPass",
        role: "admin",
        description: null,
        rank: 8
    },
    {
        name: "MKGUN3",
        email: "Deliver@bullets.com",
        password: "MaoGay",
        role: "member",
        description: null,
        rank: 4
    },
    {
        name: "NotAUser",
        email: "none@nope.com",
        password: "nothing",
        role: "member",
        description: null,
        rank: 2
    },
    {
        name: "Guy2",
        email: "Guy2@fake.com",
        password: "JustAGuy",
        role: "member",
        description: "But hey, I have a description!",
        rank: 0
    }
] as readonly Users[];
