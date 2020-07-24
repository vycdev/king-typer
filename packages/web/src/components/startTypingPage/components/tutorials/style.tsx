import styled from "@emotion/styled";
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

type ListTitleProps = { completed: boolean };

export const Wrapper = styled.div`
    background-color: ${theme.background.primary};
    font-family: "Verdana";
`;

export const NotLoggedIn = styled.div`
    color: ${theme.text.primary};
    font-size: 22px;
    text-align: center;
    padding: 20px;
`;

export const ListElement = styled.div`
    border-top: 6px solid
        ${(props: ListTitleProps) =>
            props.completed ? theme.tertiary : theme.secondary};
    width: 200px;
    height: 250px;
    display: inline-flex;
    margin: 20px;

    a {
        text-decoration: none;
        font-size: 20px;
        color: ${theme.text.secondary};
    }
`;

export const ListTitle = styled.div`
    width: 100%;
    font-size: 18px;
    color: ${theme.text.primary};
    text-align: center;
    margin-top: 10px;
`;

export const ListWrapper = styled.div`
    width: 80%;
    margin: auto;
`;

export const TextPreview = styled.div`
    color: ${theme.text.primary};
    margin-top: 10px;
    width: 100%;
    text-align: center;
`;

export const InsideItemWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`;

export const IdDifficulty = styled.div`
    text-align: center;
    border-top: 1px dashed
        ${(props: ListTitleProps) =>
            props.completed ? theme.tertiary : theme.secondary};
    color: ${theme.text.primary};
    width: 100%;
    margin-top: 10px;
    padding-top: 10px;
`;
export const Requirements = styled.div`
    text-align: center;
    color: ${theme.text.primary};
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
`;
export const RequirementsTitle = styled.div`
    width: 100%;
    font-size: 18px;
    color: ${theme.text.primary};
    text-align: center;
    margin-top: 10px;
`;

export const Button = styled.div`
    height: 15px;
    font-style: normal;
    min-width: 120px;
    color: ${theme.text.secondary};
    background: ${theme.primary};
    margin: 5px;
    font-size: 12px;
    text-align: center;
    padding: 5px;
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
