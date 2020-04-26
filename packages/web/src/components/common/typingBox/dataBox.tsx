import React, { useState, useEffect, useRef } from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";
import { DataBoxWrapper } from "./style";

import { DataBoxType, typedArrayInterface } from "./helpers/interfaces";

export const DataBox = (props: DataBoxType<typedArrayInterface>) => {
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
                    stroke="#198cf6"
                    dot={<></>}
                />
                <Line
                    name="WPM"
                    type="monotone"
                    dataKey="uncorrectedwpm"
                    stroke="#0064a6"
                    strokeDasharray="3 4 5 2"
                    dot={<></>}
                />
                <Line
                    name="Accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#00a627"
                    dot={<></>}
                />

                <XAxis dataKey="timeUsed" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </DataBoxWrapper>
    );
};
