import styled from "@emotion/styled";
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    width: 80vw;
    height: 80vh;
    position: absolute;
    z-index: 9999;
`;

export const FormWrapper = styled.div`
    width: 500px;
    height: 400px;

    background: ${theme.primary};

    color: ${theme.text.secondary};

    border-left: 4px solid ${theme.secondary};

    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    -webkit-box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);
    -moz-box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);
    box-shadow: 0px 0px 29px 6px rgba(0, 0, 0, 0.41);

    form {
        width: 80%;
        margin: auto;
    }

    input,
    select {
        width: 100%;
        padding: 12px 20px;
        margin: auto;
        margin-top: 40px;
        display: inline-block;
        border-radius: 2px;
        box-sizing: border-box;
        border: 1px solid lightgrey;
    }

    input[type="submit"] {
        font-family: "Verdana";
        font-size: 17px;
        width: 100%;
        background-color: ${theme.secondary};
        color: ${theme.text.primary};
        padding: 10px;
        margin-top: 70px;
        border: none;
        border-radius: 2px;

        text-align: center;
        transition-duration: 0.3s;
    }

    input[type="submit"]:hover {
        filter: brightness(${theme.brightness.lighter});
        -webkit-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        -moz-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
    }
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
