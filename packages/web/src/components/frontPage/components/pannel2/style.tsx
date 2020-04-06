import styled from "@emotion/styled";

export const StyledPannel2 = styled.div`
    background: white;
    height: 80vh;
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
    width: 80%;
`;

export const TextStyling = styled.div`
    font-family: "Verdana";
    color: #242424;
    text-align: center;
    font-size: 20px;
`;
export const FixText = styled.div`
    position: relative;
    flex: 2 2 750px;
`;
export const FixChart = styled.div`
    position: relative;
    flex: 1 1 500px;
    height: 500px;
`;
