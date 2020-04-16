import styled from "@emotion/styled";

export const FooterStyled = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    font-family: Verdana;
    height: 35px;
    color: white;
    padding-top: 10px;
    text-align: center;
    background: #242424;
    & a {
        text-decoration: none;
    }

    & svg {
        width: 30px;
        height: 30px;
        fill: white;
    }
    & svg:hover {
        fill: #fde400;
    }
`;
