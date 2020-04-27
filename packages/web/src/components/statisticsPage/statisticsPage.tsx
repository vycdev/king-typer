import React, { useEffect, useState } from "react";

import { PreviousScoresChart } from "./components/previousScoresChart";

import { ThoseArePreviousScores, PageWrapper, Content } from "./style";
import { previousScoresType } from "./helpers/interfaces";

export const StatisticsPage = () => {
    const [previousScores, setPreviousScores] = useState(
        JSON.parse(localStorage.getItem("previousScores"))
    );

    return (
        <PageWrapper>
            <Content>
                <ThoseArePreviousScores>
                    Those are your previous scores:
                </ThoseArePreviousScores>
                <PreviousScoresChart
                    dataProp={previousScores}
                ></PreviousScoresChart>
            </Content>
        </PageWrapper>
    );
};
