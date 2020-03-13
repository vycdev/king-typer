import { css } from "@emotion/core";

export const globalStyle = css({
    body: {
        margin: 0,
        padding: 0,
        msOverflowStyle: "none"
    },
    "body::-webkit-scrollbar": { display: "none" }
});
