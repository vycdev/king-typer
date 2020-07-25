import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    width: 85%;
    font-family: "Verdana";
    color: ${theme.text.primary};
    margin: auto;
    padding: 10px;
`;

export const NotAdmin = styled.div`
    padding: 20px;
    text-align: center;
    font-size: 25px;
    border: 1px solid ${theme.background.secondary};
`;

export const DashBoardHeader = styled.div`
    border-bottom: 1px solid ${theme.background.secondary};
    display: flex;
    padding: 10px;
    position: relative;
`;

export const Title = styled.div`
    text-align: center;
    position: absolute;
    width: 100%;
    font-size: 20px;
    margin-top: -10px;
`;

export const Name = styled.div`
    font-size: 14px;
`;

export const Pannel = styled.div`
    position: relative;
    display: block;
    min-height: 250px;
    max-height: 400px;
    width: 100%;
    margin: 10px auto;
    border: 1px solid ${theme.background.secondary};
    overflow-y: auto;
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

export const PannelTitle = styled.div`
    border-bottom: 1px dashed ${theme.background.secondary};
    width: 95%;
    padding: 5px;
    text-align: center;
    margin: 0 auto;
    height: 20px;
`;

export const ItemSettingsWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
`;
export const ItemSettings = styled.div`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 400px;
    height: 600px;
    border-left: 4px solid ${theme.secondary};
    background: ${theme.primary};
    padding: 20px;
    -webkit-box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);
    -moz-box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);
    box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);

    form {
        width: 80%;
        margin: auto;
    }

    input,
    select,
    textarea {
        width: 100%;
        padding: 12px 20px;
        margin: auto;
        margin-top: 10px;
        display: inline-block;
        border-radius: 2px;
        box-sizing: border-box;
        border: 1px solid lightgrey;
    }

    label input[type="checkbox"] {
        width: 20px;
        margin: 12px 0;
    }
    label {
        margin-right: 20px;
    }

    button {
        font-family: "Verdana";
        font-size: 17px;
        width: 100%;
        background-color: ${theme.secondary};
        color: ${theme.text.primary};
        padding: 10px;
        margin-top: 20px;
        border: none;
        border-radius: 2px;

        text-align: center;
        transition-duration: 0.3s;
    }

    button:hover {
        filter: brightness(${theme.brightness.lighter});
        -webkit-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        -moz-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
    }
`;

export const XButton = styled.div`
    font-size: 20px;
    position: absolute;
    margin-right: 10px;
    margin-top: 5px;
    right: 0;
    top: 0;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

export const StatusDivWrapper = styled.div`
    margin: 5px;
    max-width: 100%;
    position: relative;
`;

export const StatusDiv = styled.div`
    width: 100%;
    word-wrap: wrap;
    position: absolute;
    font-family: "Verdana";
    font-size: 12px;
    color: ${(props: { status: "positive" | "negative" }) =>
        props.status === "positive"
            ? theme.status.positive
            : theme.status.negative};
`;

export const ListItemWrapper = styled.tr`
    text-align: center;
`;

export const Table = styled.table`
    width: 95%;
    margin: 20px auto;

    td,
    th {
        padding: 10px 0;
        border-bottom: 1px solid ${theme.background.secondary};
    }
`;

export const Button = styled.div`
    font-style: normal;
    min-width: 120px;
    color: ${theme.text.secondary};
    background: ${theme.primary};
    margin: 20px;
    font-size: 20px;
    text-align: center;
    padding: 15px;
    font-family: "Verdana";
    cursor: pointer;
    &:hover {
        filter: brightness(${theme.brightness.lighter});
    }
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;
