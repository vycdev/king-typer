import styled from "@emotion/styled";

// File that contains styled compoentns for the 3rd pannel of the home page (the pannel with the tutorial about touchtyping)

export const StyledPannel3 = styled.div`
    background: #198cf6;
    height: auto;
    margin-top: 100px;
    display: flex;
    position: relative;
    align-content: center;
    align-items: center;
    flex-wrap: wrap-reverse;
    flex-direction: row;
    & > * {
        flex: 1 0 450px;
    }
`;

export const VerticallyCenteredDiv = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: auto;
    & img {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        width: 750px;
    }
`;

export const Text = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 80%;
`;

export const TextStyling = styled.div`
    font-family: "Verdana";
    color: white;
    text-align: center;
    font-size: 20px;
    & ul {
        /* list-style-position: inside; */
        /* list-style-type: none; */
        text-align: left;
    }
`;
export const FixText = styled.div`
    position: relative;
    flex: 2 0 950px;
    min-height: 850px;
`;
export const FixImage = styled.div`
    position: relative;
    flex: 1 0 800px;
    min-height: 500px;
`;
