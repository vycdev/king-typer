import styled from "@emotion/styled";
import { getTheme } from "../../../../utils/getTheme";

const theme = getTheme();

export const ListItem = styled.div`
    margin: auto;
    padding: 5px;
    color: ${theme.text.primary};

    font-family: "Verdana";
    font-size: 16px;
    text-align: center;

    /* border-bottom: 1px solid ${theme.background.secondary}; */
    color: ${theme.text.primary};
    width: 80%;
    a {
        text-decoration: none;

        color: ${theme.primary};
    }

    a:hover {
        color: ${theme.tertiary};
    }
`;

export const ListTitle = styled.div`
    margin: 0 auto;
    padding: 10px;
    color: ${theme.text.primary};

    font-family: "Verdana";
    font-size: 20px;
    text-align: center;

    border-bottom: 2px dashed ${theme.background.secondary};
    color: ${theme.text.primary};
    width: 50%;
`;
