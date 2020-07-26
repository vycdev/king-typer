import React from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";
import { DataBoxWrapper } from "../style";

import { DataBoxType, TypedArrayInterface } from "../helpers/interfaces";
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

export const DataBox = (props: DataBoxType<TypedArrayInterface>) => {
    return (
        <DataBoxWrapper>
            <LineChart
                width={725}
                height={300}
                data={props.dataProp}
                margin={{ top: 30, bottom: 5 }}
            >
                <Line
                    name="Corrected WPM"
                    type="monotone"
                    dataKey="wpm"
                    stroke={theme.primary}
                    dot={<></>}
                />
                <Line
                    name="WPM"
                    type="monotone"
                    dataKey="uncorrectedwpm"
                    stroke={theme.primary}
                    strokeDasharray="3 4 5 2"
                    dot={<></>}
                />
                <Line
                    name="Accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    stroke={theme.tertiary}
                    dot={<></>}
                />

                <XAxis dataKey="timeUsed" stroke={theme.background.secondary} />
                <YAxis stroke={theme.background.secondary} />
                <Tooltip
                    contentStyle={{
                        background: theme.background.secondary,
                        border: "none"
                    }}
                    wrapperStyle={{ color: theme.text.secondary }}
                    itemStyle={{ color: theme.text.secondary }}
                />
                <Legend />
            </LineChart>
        </DataBoxWrapper>
    );
};
