export interface previousScoresType {
    date: string;
    wpm: number;
    uncorrectedwpm: number;
    accuracy: number;
}
export interface DataBoxType<T> {
    dataProp: Array<T>;
}
