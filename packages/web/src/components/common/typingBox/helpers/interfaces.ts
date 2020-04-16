export interface typingBoxProps {
    mode: "easy" | "hard";
    colorCodes: {
        wrong: string;
        correct: string;
        notTyped: string;
    };
}
export interface typedArrayInterface {
    word: string;
    state: "correct" | "wrong";
    time: number;
    wpm: number;
    accuracy: number;
    timeUsed: string;
}

export interface DataBoxType {
    data: Array<typingBoxProps>;
}
