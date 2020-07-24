import styled from "@emotion/styled";
import { getTheme } from "../../../utils/getTheme";

// File which contains all the styled components used by the typing box page

const theme = getTheme();

export const Wrapper = styled.div`
    width: 100%;
    padding: 15px 0px;
    position: relative;
    color: ${theme.text.primary};
`;

export const Container = styled.div`
    width: 750px;
    height: 250px;
    position: relative;
    text-align: center;

    border-top: 1px dashed ${theme.background.secondary};

    margin: auto;

    @import url("https://fonts.googleapis.com/css?family=Hind&display=swap");
    font-family: "Hind";
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
`;

export const Displayer = styled.div`
    text-align: center;
    width: 100%;
    height: 30px;

    font-family: "Verdana";
`;

export const TextBox = styled.div`
    margin-left: 2px;
    display: inline-flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    font-size: 30px;

    scroll-behavior: smooth;

    -ms-overflow-style: none;
    overflow: hidden;

    width: 99%;
    max-height: 200px;

    &::-webkit-scrollbar {
        display: none;
    }
    .spaced {
        padding-right: 8px;
    }
    .isBeingTyped {
        display: inline-flex;
        flex-wrap: wrap;
    }
`;

export const InputBox = styled.input`
    width: 100%;

    border-style: solid;
    border-width: 0;
    border-top: 1px solid ${theme.background.secondary};
    border-bottom: 1px solid ${theme.background.secondary};
    background-color: ${theme.background.primary};
    color: ${theme.text.primary};
    position: absolute;
    bottom: 0;
    left: 0px;

    height: 25px;
    text-align: center;

    outline: none;

    font-size: 22px;
`;

export const DataBoxWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid ${theme.background.secondary};
`;

export const TryAgainButton = styled.button`
    background: ${theme.primary};
    border: none;
    text-align: center;
    text-decoration: none;
    color: ${theme.text.secondary};
    padding: 3px 6px;
    margin-left: 5px;
    margin-bottom: 1px;

    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        -ms-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
    &::after {
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        -ms-box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    &:hover::after {
        opacity: 1;
    }
`;

export const ActuallyTyped = styled.div`
    margin-top: 10px;
    height: 200px;
    max-height: 200px;
    overflow: auto;
    /* width */
    &::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: ${theme.primary};
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: ${theme.background.secondary};
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: ${theme.tertiary};
    }
`;

export const BlockOfFinishedText = styled.div`
    margin-top: 20px;
    display: block;
    & div {
        padding-right: 2px;
    }
`;

export const TextInfo = styled.div`
    border-bottom: 1px solid ${theme.background.secondary};
`;

export const WaitingPlayers = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${theme.text.primary};

    margin-bottom: 5px;

    font-family: "Verdana";
`;
