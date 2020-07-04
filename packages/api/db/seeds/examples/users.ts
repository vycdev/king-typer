interface Users {
    name: string;
    email: string;
    password: string;
    role?: string | null;
    description?: string | null;
}

export default [
    {
        name: "UserUser",
        email: "UserUser@fake.com",
        password: "UserPass",
        role: "admin",
        description: null
    },
    {
        name: "MKGUN3",
        email: "Deliver@bullets.com",
        password: "MaoGay",
        role: null,
        description: null
    },
    {
        name: "NotAUser",
        email: "none@nope.com",
        password: "nothing",
        role: null,
        description: null
    },
    {
        name: "Guy2",
        email: "Guy2@fake.com",
        password: "JustAGuy",
        role: null,
        description: "But hey, I have a description!"
    }
] as readonly Users[];
