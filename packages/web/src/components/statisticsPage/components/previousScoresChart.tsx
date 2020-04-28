import React, { useState, useEffect, useRef } from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { DataBoxWrapper } from "../style";

import { DataBoxType, previousScoresType } from "../helpers/interfaces";

// Chart that is used for displaying the previous scores of the user.

export const PreviousScoresChart = (props: DataBoxType<previousScoresType>) => {
    return (
        <DataBoxWrapper>
            <LineChart
                width={725}
                height={300}
                data={props.dataProp}
                margin={{ top: 50, bottom: 30 }}
            >
                <Line
                    name="WPM"
                    type="monotone"
                    dataKey="wpm"
                    stroke="#198cf6"
                    dot={<></>}
                />
                <Line
                    name="Accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#00a627"
                    dot={<></>}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </DataBoxWrapper>
    );
};
