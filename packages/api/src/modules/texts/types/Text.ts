type Requirement = "wpm" | "rawwpm" | "acc";

export default interface Text {
    id: number;
    title: string;
    text: string;
    ordered: boolean;
    tutorial: boolean;
    difficulty: number;
    author: number;
    requirements?: Record<Requirement, number>;
}
