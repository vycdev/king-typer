import * as React from "react";

import { StyledPannel2, Text, TextStyling, FixChart, FixText } from "./style";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";
import { VerticallyCenteredDiv } from "./style";

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
            <FixChart>
                <VerticallyCenteredDiv>
                    <LineChart
                        width={500}
                        height={450}
                        data={data}
                        margin={{ top: 100, right: 20, bottom: 5, left: 0 }}
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
                </VerticallyCenteredDiv>
            </FixChart>
            <FixText>
                <Text>
                    <TextStyling>
                        <h2>Typing, typing, typing...</h2>
                        As you can see in the chart the average typing speed for
                        a person is about 40 words per minute. At that rate
                        you’re making progress of about 200 characters per
                        minute. Having the ability to type faster isn’t that
                        hard as one might think. At one point in their lives,
                        all of our expert transcriptionists were mere average
                        typists – some even using pointer fingers only! Over
                        time and with lots of technique and practice, you too
                        can build up your typing skills and become more
                        efficient every day.
                    </TextStyling>
                </Text>
            </FixText>
        </StyledPannel2>
    );
};
