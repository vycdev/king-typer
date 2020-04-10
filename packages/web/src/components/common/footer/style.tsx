import styled from "@emotion/styled";

export const FooterStyled = styled.div`
    position: relative;
    width: 100%;
    font-family: Verdana;
    height: 50px;
    color: white;
    padding-top: 10px;
    text-align: center;
    background: #242424;
    & a {
        text-decoration: none;
    }
   
    & svg{
        width: 40px;
        height: 40px;
        fill: white;
    }
    & svg:hover{
        fill: #fde400;
    }
`;
