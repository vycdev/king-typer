import styled from "@emotion/styled";

export const StyledPannel2 = styled.div`
    background: white;
    height: 50vh;
    display: flex;
    position: relative;

    flex-wrap: wrap;
    flex-direction: row;
    & > * {
        flex: 1 1 450px;
    }
`;
export const VerticallyCenteredDiv = styled.div`
    margin: 0;
    position: absolute;
    top: 55%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

export const Text = styled.div`
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

export const TextStyling = styled.div`
    font-family: "Verdana";
    color: black;
    font-weight: bold;
    text-align: center;
`;
export const FixText = styled.div`
    position: relative;
    flex: 2 2 750px;
    margin-top: 50px;
`;
export const FixChart = styled.div`
    position: relative;
    flex: 1 1 500px;
    height: 500px;
`;
