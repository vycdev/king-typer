import * as React from "react";

import { getTheme } from "../../../utils/getTheme";

const theme = getTheme();

// 1st pannel component for home page

interface LogoSvgProps {
    viewBox: string;
}

export const LogoSvg = (props: LogoSvgProps) => {
    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={props.viewBox}
        >
            <path
                d="M522 399.24H0V86.366l147.746 158.067L261.815 0l126.562 244.433L522 86.366V399.24z"
                fill={theme.secondary}
            />
            <path
                d="M436.72 297.163l27.535-52.73 26.783 52.73-26.783 53.734-27.535-53.734zM39.11 297.163l27.534-52.73 26.784 52.73-26.784 53.734-27.535-53.734zM206.41 243.347l59.75-114.069 58.121 114.069-58.121 116.241-59.75-116.241z"
                fill={theme.primary}
                stroke={theme.tertiary}
            />
        </svg>
    );
};
