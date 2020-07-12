import styled from "@emotion/styled";
import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

export const Wrapper = styled.div`
    border-left: 1px solid ${theme.background.secondary};
    border-right: 1px solid ${theme.background.secondary};
    width: 80%;
    min-height: 100vh;
    margin: auto;
`;

export const InsideWrapper = styled.div`
    padding: 30px;
`;

export const ProfileName = styled.div`
    color: ${theme.text.primary};
    font-style: italic;
    font-family: "Verdana";
    padding-bottom: 10px;
`;

export const FlagImage = styled.img`
    max-height: 24px;
    margin-right: 10px;
`;

export const Name = styled.div`
    font-size: 48px;
    margin-top: -24px;
`;

export const UnderName = styled.div`
    font-size: 15px;
    white-space: nowrap;
`;

export const FlagNameGroup = styled.div`
    display: inline-flex;
    height: 48px;
`;

export const Statistics = styled.div`
    text-align: right;
    width: 100%;
`;

export const GeneralStatistics = styled.div`
    font-size: 15px;
    border-bottom: 1px dashed ${theme.background.secondary};
    padding: 5px;
    display: inline-flex;
    width: 100%;
`;

export const LogoutSwitchThemeWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const LogoutSwitchButton = styled.div`
    width: 90px;
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
`;
