import styled from "@emotion/styled";
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    background-color: ${theme.background.primary};
    font-family: "Verdana";
`;

export const NavBar = styled.div`
    height: 100%;
    width: 0px;
    position: absolute;
    z-index: 100;
    top: 54px;
    left: 0;
    background-color: ${theme.primary};
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 28px;

    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 20px;
        color: ${theme.text.secondary};
        display: block;
    }

    a:hover {
        color: ${theme.text.secondary};
        border-left: 3px solid white;
        background: ${theme.primary};
        filter: brightness(${theme.brightness.lighter});
    }
`;

export const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 30px;
    margin-left: 50px;
    color: ${theme.text.secondary};
    cursor: pointer;
    &:hover {
        color: ${theme.text.secondary};
    }
`;

export const OpenButton = styled.span`
    font-size: 30px;
    cursor: pointer;
    color: ${theme.text.primary};
    position: fixed;
    top: 64px;
    left: 20px;
    z-index: 10;
`;

export const Category = styled.div`
    padding: 20px 8px 8px 32px;
    color: ${theme.text.secondary};
    border-bottom: 1px dashed ${theme.background.primary};
    font-size: 16px;
    font-family: "Verdana";
    white-space: nowrap;
`;
