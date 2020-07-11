interface Achievement {
    name: string;
    description: string;
    difficulty: number;
    requirements: Record<string, number>;
}

export default [
    {
        name: "Achievement 1",
        description: "This is a testing achievement!",
        difficulty: 1,
        requirements: {
            wpm: 10,
            acc: 50
        }
    },
    {
        name: "Achievement 2",
        description: "This is a second testing achievement!",
        difficulty: 2,
        requirements: {
            wpm: 25,
            acc: 75
        }
    }
] as Achievement[];
