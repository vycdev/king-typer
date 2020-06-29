import styled from "@emotion/styled";

export const Wrapper = styled.div`
    background-color: white;
    font-family: "Verdana";
`;

export const NavBar = styled.div`
    height: 100%;
    width: 200px;
    position: absolute;
    z-index: 100;
    top: 54px;
    left: 0;
    background-color: #198cf6;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 40px;

    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 20px;
        color: white;
        display: block;
        transition: 0.3s;
    }

    a:hover {
        color: white;
        border-left: 2px solid white;
        background: #349dfe;
    }
`;

export const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 30px;
    margin-left: 50px;
    color: white;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

export const OpenButton = styled.span`
    font-size: 30px;
    cursor: pointer;
    position: fixed;
    top: 64px;
    left: 20px;
    z-index: 10;
`;

export const Category = styled.div`
    padding: 8px 8px 8px 32px;
    color: white;
    border-bottom: 1px dotted #99b4ff;
    font-size: 16px;
    font-family: "Verdana";
    white-space: nowrap;
`;
