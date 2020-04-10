import styled from "@emotion/styled";

export const Fix = styled.div`
    width: 100%;
`;

export const Ul = styled.ul`
    font-family: "Verdana";
    font-size: 18px;

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
        padding: 18px 28px;
        text-decoration: none;
        height: 18px;
    }

    a:hover {
        border-top: 2px solid #fff;
        height: 20px;
        padding-top: 14px;
        background-color: #349dfe;
    }
`;
