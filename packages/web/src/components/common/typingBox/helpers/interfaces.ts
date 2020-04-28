// Typing box props interface, contains the types for the props of the typing box component
export interface typingBoxProps {
    mode: "easy" | "hard";
    colorCodes: {
        wrong: string;
        correct: string;
        notTyped: string;
    };
}

// typedArrayInterface is the interface for the typedArray variable in the typing box
export interface typedArrayInterface {
    word: string;
    state: "correct" | "wrong";
    time: number | null;
    wpm: number;
    accuracy: number;
    timeUsed: string;
    uncorrectedwpm: number;
}

// databox type for prop type of the chart that displays the info after the test
export interface DataBoxType<T> {
    dataProp: Array<T>;
}
