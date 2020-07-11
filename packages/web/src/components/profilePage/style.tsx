import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    border-left: 1px solid ${theme.background.secondary};
    border-right: 1px solid ${theme.background.secondary};
    width: 80%;
    height: 100%;
    margin: auto;
`;
export const InsideWrapper = styled.div`
    padding: 30px;
`;
