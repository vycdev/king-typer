import styled from "@emotion/styled";

import { getTheme } from "../../../../../utils/getTheme";

const theme = getTheme();

interface PropsInside {
    color: string;
    progress: number;
}
interface PropsOutside {
    color: string;
    multiplayer: boolean;
}

export const Wrapper = styled.div`
    width: 750px;
    color: ${theme.text.primary};
    margin: 10px auto;
`;

export const ProgressOutside = styled.div`
    margin-right: ${(props: PropsOutside) =>
        props.multiplayer ? "10px" : "0"};
    border-radius: 10px;
    height: 8px;
    width: 100%;
    border: 1px solid ${(props: PropsOutside) => props.color};
    margin-top: auto;
    margin-bottom: auto;
`;

export const ProgressInside = styled.div`
    height: 100%;
    background: ${(props: PropsInside) => props.color};
    width: ${(props: PropsInside) => props.progress}%;
`;

export const PlaceProgressWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    color: ${theme.text.primary};
    font-family: "Verdana";
    font-size: 16px;
`;

export const NameFlag = styled.div`
    color: ${theme.text.primary};
    font-family: "Verdana";
    font-size: 16px;
`;

export const FlagImage = styled.img`
    max-height: 10px;
    margin-right: 10px;
`;

export const LevelDisplay = styled.span`
    font-size: 14px;
`;
