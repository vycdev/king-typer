import styled from "@emotion/styled";

export const Fix = styled.div`
    width: 100%;
`;

export const Ul = styled.ul`
    @import url("https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap");
    font-family: "Press Start 2P", cursive;
    font-size: 12px;

    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #198cf6;
    display: inline-flex;
    width: 100%;
`;
export const Li = styled.li`
    a {
        display: block;
        color: white;
        text-align: center;
        padding: 16px 28px;
        text-decoration: none;
        height: 14px;
    }

    a:hover {
        border-top: 4px solid #fff;
        height: 10px;
        padding-top: 12px;
        background-color: #349dfe;
    }
`;
