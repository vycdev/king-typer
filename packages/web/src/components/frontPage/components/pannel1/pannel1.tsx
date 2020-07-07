import * as React from "react";
import { Link } from "react-router-dom";

const ReactRotatingText = require("react-rotating-text");

import { getRandomText } from "../../../../utils/randomText";

import { LogoSvg } from "../../../common/logo/logo";

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
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

// 1st pannel component for home page

export const Pannel1 = () => {
    return (
        <StyledPannel1>
            <FixCrown>
                <VerticallyCenteredDiv>
                    <SvgCrown>
                        <LogoSvg viewBox="0 0 522 400"></LogoSvg>
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
                                pause={3000}
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
                    style={{ maxHeight: "200px" }}
                    width="100%"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M1921.5 313.056H-1v-153c50.808 20.339 585.5-12 998-114.5s924.5 0 924.5 0v267.5z"
                        fill={theme.background.primary}
                    />
                </svg>
            </Wave>
        </StyledPannel1>
    );
};
