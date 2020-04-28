import { css } from "@emotion/core";
import styled from "@emotion/styled";

// This file contains exports with styled components and css styling for the index.tsx file.

// Global styles that apply to the entire body of the page
export const globalStyle = css({
    body: {
        margin: 0,
        padding: 0,
        msOverflowStyle: "none"
    },
    "body::-webkit-scrollbar": { display: "none" }
});

export const Container = styled.div`
    position: relative;
    min-height: 100vh;
`;

export const Content = styled.div`
    /* padding-bottom: 35px; */
`;
