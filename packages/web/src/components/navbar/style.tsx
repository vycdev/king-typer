import styled from "@emotion/styled";

export const Ul = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    display: inline-flex;
    width: 100%;
`;
export const Li = styled.li`
    a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    a:hover {
        background-color: #111;
    }
`;
