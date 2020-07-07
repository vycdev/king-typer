import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

export const BackgroundTriangle = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    z-index: -5;
    left: 0;
    border-style: solid;
    border-width: 94vh 100vw 0 0;
    border-color: ${theme.primary} transparent transparent transparent;
    box-shadow: 5px 10px #888888;
`;
export const Wrapper = styled.div`
    background-color: ${theme.background.primary};
    min-width: 100%;
    min-height: 100%;
`;

export const LoginBox = styled.div`
    display: inline-flex;
    position: absolute;
    top: 25%;
    left: 22%;
    width: 56%;
    height: 50%;

    min-width: 700px;
    min-height: 500px;
    max-height: 600px;
    max-width: 2000px;

    background: ${theme.primary};
    -webkit-box-shadow: 9px 9px 31px 4px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 9px 9px 31px 4px rgba(0, 0, 0, 0.51);
    box-shadow: 9px 9px 31px 4px rgba(0, 0, 0, 0.51);
`;

export const LoginLogoBox = styled.div`
    position: relative;
    height: 100%;
    width: 40%;
    background: ${theme.background.primary};
`;

export const FixCrown = styled.div`
    position: absolute;
    height: 40%;
    width: 60%;
    top: 10%;
    left: 20%;
`;

export const Title = styled.div`
    padding: 20px;
    color: ${theme.text.primary};
    font-family: "Verdana";
    font-weight: bold;
    text-align: center;
    font-size: 44px;
    text-overflow: nowrap;
`;

export const FormWrapper = styled.div`
    font-family: "Verdana";
    position: relative;
    display: block;
    width: 60%;
    height: 100%;
    color: ${theme.text.primary};

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
        margin-top: 90px;
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

export const Button = styled.div`
    position: relative;
    font-family: "Verdana";
    width: 200px;
    padding: 10px;
    margin-top: 20px;
    color: ${theme.text.secondary};
    background: ${theme.primary};
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    transition-duration: 0.3s;
    &:hover {
        filter: brightness(${theme.brightness.lighter});
        -webkit-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        -moz-box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
        box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.36);
    }
    a {
        text-decoration: none;
        padding: 15px 70px;
        color: ${theme.text.secondary};
    }
`;
