import React from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { DataBoxWrapper } from "../style";

import { DataBoxType, PreviousScoresType } from "../helpers/interfaces";
import { getTheme } from "../../../utils/getTheme";

const theme = getTheme();

// Chart that is used for displaying the previous scores of the user.

export const GamesChart = (props: DataBoxType<PreviousScoresType>) => {
    return (
        <DataBoxWrapper>
            <LineChart
                color="white"
                width={600}
                height={250}
                data={props.dataProp}
                margin={{ top: 30, right: 30, bottom: 30 }}
            >
                {" "}
                <Tooltip
                    contentStyle={{
                        background: theme.background.secondary,
                        border: "none"
                    }}
                    wrapperStyle={{ color: theme.text.secondary }}
                    itemStyle={{ color: theme.text.secondary }}
                />
                <Line
                    name="WPM"
                    type="monotone"
                    dataKey="wpm"
                    stroke={theme.primary}
                    dot={<></>}
                />
                <Line
                    name="Accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    stroke={theme.tertiary}
                    dot={<></>}
                />
                <XAxis
                    dataKey="date"
                    interval={1}
                    angle={30}
                    dy={15}
                    dx={-15}
                    stroke={theme.background.secondary}
                />
                <YAxis stroke={theme.background.secondary} />
            </LineChart>
        </DataBoxWrapper>
    );
};
