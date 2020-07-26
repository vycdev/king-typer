// inteface for the array that contains objects with previous scores
export interface PreviousScoresType {
    date: string;
    wpm: number;
    uncorrectedwpm: number;
    accuracy: number;
}
// props type for the chart that displays previous scores
export interface DataBoxType<T> {
    dataProp: Array<T>;
}

export interface UserGame {
    accuracy: number;
    date: string;
    rawwpm: number;
    userid: number;
    wpm: number;
    difficulty: number;
    textid: number;
}
