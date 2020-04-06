import * as React from "react";

import { StyledPannel2 } from "./style";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip
} from "recharts";

const data = [
    { percentage: 1, wpmName: "10 WPM" },
    { percentage: 6, wpmName: "20 WPM" },
    { percentage: 17, wpmName: "30 WPM" },
    { percentage: 19, wpmName: "40 WPM" },
    { percentage: 17, wpmName: "50 WPM" },
    { percentage: 14, wpmName: "60 WPM" },
    { percentage: 10.5, wpmName: "70 WPM" },
    { percentage: 7, wpmName: "80 WPM" },
    { percentage: 4, wpmName: "90 WPM" },
    { percentage: 2, wpmName: "100 WPM" },
    { percentage: 1, wpmName: "110 WPM" },
    { percentage: 0.5, wpmName: "120 WPM" },
    { percentage: 0.3, wpmName: "130 WPM" },
    { percentage: 0.2, wpmName: "140 WPM" },
    { percentage: 0.1, wpmName: "150 WPM" }
];

export const Pannel2 = () => {
    return (
        <StyledPannel2>
            <LineChart
                width={500}
                height={350}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line
                    name="Percentage"
                    type="monotone"
                    dataKey="percentage"
                    stroke="#198cf6"
                />
                <CartesianGrid stroke="#cccc" strokeDasharray="5 5" />
                <XAxis dataKey="wpmName" interval={2} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </StyledPannel2>
    );
};
