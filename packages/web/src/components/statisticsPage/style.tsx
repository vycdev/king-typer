import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

// Styled components for the statistics page

const theme = getTheme();

export const ThoseArePreviousScores = styled.div`
    font-size: 18px;
    padding-top: 10px;
`;

export const PageWrapper = styled.div`
    width: 100%;
    color: ${theme.text.primary};
`;
export const Content = styled.div`
    margin: auto;
    width: 750px;
    height: 250px;
    position: relative;
    text-align: center;
    @import url("https://fonts.googleapis.com/css?family=Hind&display=swap");
    font-family: "Hind";
`;

export const ListItem = styled.div`
    width: 800px;
    padding: 5px;
    color: ${theme.text.primary};
    /* border-top: 1px solid gray; */
    font-size: 16px;
    vertical-align: middle;
`;

export const LooksLike = styled.div`
    font-size: 30px;
    padding-top: 20px;
`;
export const DataBoxWrapper = styled.div`
    width: 100%;
`;
export const TopBar = styled.div`
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid ${theme.background.secondary};
`;
