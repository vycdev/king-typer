import styled from "@emotion/styled";

import { getTheme, themes } from "../../../utils/getTheme";
// styled components for the footer

const theme = getTheme();

export const FooterStyled = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    font-family: Verdana;
    height: 35px;
    color: ${theme.text.secondary};
    padding-top: 10px;
    text-align: center;
    background: ${theme.primary};
    & a {
        text-decoration: none;
    }

    & svg {
        width: 30px;
        height: 30px;
        fill: ${theme.text.secondary};
    }
    & svg:hover {
        fill: ${theme.secondary};
    }
`;
