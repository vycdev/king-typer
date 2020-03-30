import styled from "@emotion/styled";
//// CONTAINER 1
export const Container = styled.div`
    background-color: #198cf6;
    height: 1080px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    & > * {
        flex: 1 1 450px;
    }
`;
//// CROWN SVG 1
export const SvgCrown = styled.div`
    width: 480px;
`;
export const FixCrown = styled.div`
    position: relative;
    flex: 1 1 500px;
`;

export const VerticallyCenteredDiv = styled.div`
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
//// TEXT ON THE RIGHT 1
export const FixText = styled.div`
    position: relative;
    flex: 2 2 750px;
`;

export const TitleTextButton = styled.div`
    @import url("https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap");
    font-family: "Press Start 2P", cursive;
    color: white;
    text-align: center;
`;
export const VerticallyCenteredText = styled.div`
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
`;

export const Title = styled.div`
    font-size: 80px;
    width: auto;
`;
