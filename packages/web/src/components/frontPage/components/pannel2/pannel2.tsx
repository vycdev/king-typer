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
import { getTheme } from "../../../../utils/getTheme";

// Data for the chart (it's hardcoded for now, in the future I will use the data colected from the users to create this chart automatically)
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
const theme = getTheme();

// 2nd pannel component

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
                            stroke={theme.primary}
                        />
                        <CartesianGrid
                            stroke={theme.tertiary}
                            strokeDasharray="5 5"
                        />
                        <XAxis
                            dataKey="wpmName"
                            interval={2}
                            stroke={theme.background.secondary}
                        />
                        <YAxis stroke={theme.background.secondary} />
                        <Tooltip
                            contentStyle={{
                                background: theme.background.secondary,
                                border: "none"
                            }}
                            wrapperStyle={{ color: theme.text.secondary }}
                            itemStyle={{ color: theme.text.secondary }}
                        />
                    </LineChart>
                </VerticallyCenteredDiv>
            </FixChart>
            <FixText>
                <Text>
                    <TextStyling>
                        <h1>What is touch typing?</h1>
                        <p>
                            Touch typing is a style of typing. Although the
                            phrase refers to typing without using the sense of
                            sight to find the keys—specifically, a touch typist
                            will know their location on the keyboard through
                            muscle memory, the term is often used to refer to a
                            specific form of touch typing that involves placing
                            the eight fingers in a horizontal row along the
                            middle of the keyboard (the home row) and having
                            them reach for specific other keys. (Under this
                            usage, typists who do not look at the keyboard but
                            do not use home row either are referred to as hybrid
                            typists.){" "}
                        </p>
                        <p>
                            Both two-handed touch typing and one-handed touch
                            typing are possible. As you can see in the chart the
                            average typing speed for a person is about 40 words
                            per minute. At that rate you’re making progress of
                            about 200 characters per minute. Having the ability
                            to type faster isn’t that hard as one might think.
                            At one point in their lives, all of our expert
                            transcriptionists were mere average typists – some
                            even using pointer fingers only! Over time and with
                            lots of technique and practice, you too can build up
                            your typing skills and become more efficient every
                            day.
                        </p>
                    </TextStyling>
                </Text>
            </FixText>
        </StyledPannel2>
    );
};
