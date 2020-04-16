import React, { useState, useEffect, useRef } from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";
import { DataBoxWrapper } from "./style";

import { DataBoxType } from "./helpers/interfaces";

export const DataBox = (props: React.Component<DataBoxType, {}>) => {
    return (
        <DataBoxWrapper>
            <LineChart
                width={725}
                height={300}
                data={props.data}
                margin={{ top: 30, bottom: 5 }}
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
                    stroke="black"
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
