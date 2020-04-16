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
                    name="WPM"
                    type="monotone"
                    dataKey="wpm"
                    stroke="#198cf6"
                    dot={<></>}
                />
                <Line
                    name="Acuracy"
                    type="monotone"
                    dataKey="acuracy"
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
