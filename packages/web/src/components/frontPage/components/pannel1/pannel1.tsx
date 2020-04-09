import * as React from "react";
import { Link } from "react-router-dom";

const ReactRotatingText = require("react-rotating-text");

import { getRandomText } from "../../../../utils/randomText";

import {
    SvgCrown,
    StyledPannel1,
    TitleTextButton,
    VerticallyCenteredDiv,
    VerticallyCenteredText,
    FixText,
    FixCrown,
    Title,
    RandomText,
    Wave,
    ButtonWrapper,
    TypeButton
} from "./style";

export const Pannel1 = () => {
    return (
        <StyledPannel1>
            <FixCrown>
                <VerticallyCenteredDiv>
                    <SvgCrown>
                        <svg
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 522 400"
                        >
                            <path
                                d="M522 399.24H0V86.366l147.746 158.067L261.815 0l126.562 244.433L522 86.366V399.24z"
                                fill="#FDE400"
                            />
                            <path
                                d="M436.72 297.163l27.535-52.73 26.783 52.73-26.783 53.734-27.535-53.734zM39.11 297.163l27.534-52.73 26.784 52.73-26.784 53.734-27.535-53.734zM206.41 243.347l59.75-114.069 58.121 114.069-58.121 116.241-59.75-116.241z"
                                fill="#033086"
                                stroke="#fff"
                            />
                        </svg>
                    </SvgCrown>
                </VerticallyCenteredDiv>
            </FixCrown>
            <FixText>
                <VerticallyCenteredText>
                    <TitleTextButton>
                        <Title>King Typer</Title>
                        <RandomText>
                            <ReactRotatingText
                                cursor={true}
                                pause={1000}
                                emptyPause={300}
                                deletingInterval={20}
                                items={getRandomText()}
                            />
                        </RandomText>
                        <ButtonWrapper>
                            <Link to="/type">
                                <TypeButton>Start Typing!</TypeButton>
                            </Link>
                        </ButtonWrapper>
                    </TitleTextButton>
                </VerticallyCenteredText>
            </FixText>

            <Wave>
                <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1920 303"
                    style={{ maxHeight: "320px" }}
                    width="100%"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M1921.5 313.056H-1v-153c50.808 20.339 585.5-12 998-114.5s924.5 0 924.5 0v267.5z"
                        fill="#fff"
                    />
                </svg>
            </Wave>
        </StyledPannel1>
    );
};
