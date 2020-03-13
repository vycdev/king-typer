import * as React from "react";

import { SvgCrown } from "./style";

export const Home = () => {
    return (
        <SvgCrown>
            <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 522 400"
            >
                <path
                    d="M522 399.24H0V86.366l147.746 158.067L261.815 0l126.562 244.433L522 86.366V399.24z"
                    fill="#FDE400"
                />
                <path
                    d="M436.72 297.163l27.535-52.73 26.783 52.73-26.783 53.734-27.535-53.734zM39.11 297.163l27.534-52.73 26.784 52.73-26.784 53.734-27.535-53.734zM206.41 243.347l59.75-114.069 58.121 114.069-58.121 116.241-59.75-116.241z"
                    fill="#033086"
                    stroke="#fff"
                />
            </svg>
        </SvgCrown>
    );
};
