interface users {
    name: string;
    email: string;
    password: string;
    description?: string;
}

export default [
    {
        name: "UserUser",
	email: "UserUser@fake.com",
	password: "UserPass",
        description: null
    },
    {
        name: "MKGUN3",
	email: "Deliver@bullets.com",
	password: "MaoGay",
        description: null
    },
    {
        name: "NotAUser",
	email: "none@nope.com",
	password: "nothing",
        description: null
    },
    {
        name: "Guy2",
	email: "Guy2@fake.com",
	password: "JustAGuy",
        description: "But hey, I have a description!"
    }
] as readonly users[];
