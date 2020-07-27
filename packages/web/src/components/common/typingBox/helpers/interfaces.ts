// Typing box props interface, contains the types for the props of the typing box component
export interface TypingBoxProps {
    mode: "easy" | "hard";
    multiplayer: boolean;
    tutorial?: boolean;
    colorCodes: {
        wrong: string;
        correct: string;
        notTyped: string;
    };
    ws?: WebSocket;
}

// typedArrayInterface is the interface for the typedArray variable in the typing box
export interface TypedArrayInterface {
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
