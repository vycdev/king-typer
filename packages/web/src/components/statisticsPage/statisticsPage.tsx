import React, { useEffect, useState } from "react";

import { PreviousScoresChart } from "./components/previousScoresChart";

import {
    ThoseArePreviousScores,
    PageWrapper,
    Content,
    ListItem,
    LooksLike,
    TopBar
} from "./style";
import { previousScoresType } from "./helpers/interfaces";

export const StatisticsPage = () => {
    const [previousScores, setPreviousScores] = useState(
        (): Array<previousScoresType> =>
            JSON.parse(localStorage.getItem("previousScores"))
    );
    const [bestwpm, setBestwpm] = useState(
        JSON.parse(localStorage.getItem("bestwpm"))
    );

    const listOfPreviousScores = () => {
        return previousScores
            .slice(0)
            .reverse()
            .map((value, index) => {
                return (
                    <ListItem
                        style={{
                            background: index % 2 === 0 ? "#e6e6e6" : "white"
                        }}
                        key={value.wpm + index.toString()}
                    >
                        Corrected WPM: {value.wpm}
                        {"   "}
                        Corrected CPM: {value.wpm * 5}
                        {"   "}
                        WPM: {value.uncorrectedwpm}
                        {"   "}
                        CPM: {Math.floor(value.uncorrectedwpm * 500) / 100}
                        {"   "}
                        Accuracy: {value.accuracy}
                        {"   "}
                        Date: {value.date}
                    </ListItem>
                );
            });
    };
    const getAverageWpm = () => {
        let sum = 0;
        if (previousScores.length < 11)
            previousScores.map(value => {
                sum += value.wpm;
            });
        else
            for (
                let i = previousScores.length - 10;
                i <= previousScores.length;
                i++
            ) {
                sum += previousScores[i].wpm;
            }
        return Math.floor((sum / previousScores.length) * 100) / 100;
    };
    const getAverageAccuracy = () => {
        let sum = 0;
        if (previousScores.length < 11)
            previousScores.map(value => {
                sum += value.accuracy;
            });
        else
            for (
                let i = previousScores.length - 10;
                i <= previousScores.length;
                i++
            ) {
                sum += previousScores[i].accuracy;
            }
        return Math.floor((sum / previousScores.length) * 100) / 100;
    };

    return (
        <PageWrapper>
            <Content>
                {previousScores.length === 0 ? (
                    <LooksLike>
                        Looks like you don't any statistics for now, take some
                        typing tests and come back.
                    </LooksLike>
                ) : (
                    <>
                        <TopBar>
                            Best score: {bestwpm} Average WPM: {getAverageWpm()}{" "}
                            Average Accuracy: {getAverageAccuracy()}
                        </TopBar>
                        <TopBar>
                            Total Tests Taken: {previousScores.length} Hours
                            Spent Typing:{" "}
                            {Math.floor((previousScores.length / 60) * 100) /
                                100}
                            {"h"}
                        </TopBar>
                        <ThoseArePreviousScores>
                            Previous scores:
                        </ThoseArePreviousScores>
                        <PreviousScoresChart
                            dataProp={previousScores}
                        ></PreviousScoresChart>
                        {listOfPreviousScores()}
                    </>
                )}
            </Content>
        </PageWrapper>
    );
};
