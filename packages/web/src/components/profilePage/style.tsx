import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    border-left: 1px solid ${theme.background.secondary};
    border-right: 1px solid ${theme.background.secondary};
    width: 80%;
    min-height: 100vh;
    margin: auto;
`;
export const InsideWrapper = styled.div`
    padding: 30px;
`;

export const ProfileName = styled.div`
    color: ${theme.text.primary};
    font-size: 48px;
    font-style: italic;
    font-family: "Verdana";
    padding-bottom: 20px;
`;
export const FlagImage = styled.img`
    max-height: 24px;
    margin-right: 10px;
`;
