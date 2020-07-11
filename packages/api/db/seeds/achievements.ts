interface Achievement {
    name: string;
    description: string;
    difficulty: number;
    requirements: Record<string, number>;
}
