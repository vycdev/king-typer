import styled from "@emotion/styled";
//// CONTAINER 1
export const Container = styled.div`
    background-color: #198cf6;
    height: min(900px, 1200px);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    width: 100%;

    &:last-child {
        grid-column: span 2;
    }
`;
//// CROWN SVG 1
export const SvgCrown = styled.div`
    width: 400px;
`;
export const Fix = styled.div`
    position: relative;
`;

export const VerticallyCenteredDiv = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
//// TEXT ON THE RIGHT 1
export const TitleTextButton = styled.div`
    text-align: center;
`;
