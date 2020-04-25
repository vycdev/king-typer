import styled from "@emotion/styled";

export const Wrapper = styled.div`
    width: 100%;
    padding: 15px;
`;

export const Container = styled.div`
    width: 750px;
    height: 250px;
    position: relative;
    text-align: center;

    margin: auto;

    @import url("https://fonts.googleapis.com/css?family=Hind&display=swap");
    font-family: "Hind";
`;

export const Displayer = styled.div`
    text-align: center;
    width: 100%;
    height: 25px;
    border-bottom: 1px solid #9e9e9e;
`;

export const TextBox = styled.div`
    margin-left: 2px;
    display: inline-flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    font-size: 25px;

    overflow-y: scroll;
    scroll-behavior: smooth;

    -ms-overflow-style: none;

    width: 99%;
    max-height: 200px;

    &::-webkit-scrollbar {
        display: none;
    }
    .spaced {
        padding-right: 4px;
    }
    .isBeingTyped {
        display: inline-flex;
        flex-wrap: wrap;
    }
`;

export const InputBox = styled.input`
    width: 100%;

    border-style: solid;
    border-width: 0;
    border-top: 1px solid #9e9e9e;
    border-bottom: 1px solid #9e9e9e;

    position: absolute;
    bottom: 0;
    left: 0px;

    height: 25px;
    text-align: center;

    outline: none;

    font-size: 22px;
`;

export const DataBoxWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #9e9e9e;
`;

export const TryAgainButton = styled.button`
    background: #198cf6;
    border: none;
    text-align: center;
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    padding: 3px;
`;
