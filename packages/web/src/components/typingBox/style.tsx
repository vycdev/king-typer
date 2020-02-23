import styled from "@emotion/styled"

export const Wrapper = styled.div`
    width: 100%;
`
export const LetterElement = styled.span`
    display: inline;
    font-size: 23px;
`

export const Container = styled.div`
    @import url("https://fonts.googleapis.com/css?family=Hind&display=swap");
    font-family: "Hind";

    width: 750px;
    height: 250px;
    position: relative;

    margin: auto;
`

export const Top = styled.div`
    text-align: center;
    width: 100%;
    height: 25px;
    border-bottom: 1px solid #9e9e9e;
`

export const Bottom = styled.input`
    width: 100%;

    border-style: solid;
    border-width: 0;
    border-top: 1px solid #9e9e9e;

    position: absolute;
    bottom: 0;
    left: 0px;

    height: 25px;
    text-align: center;

    outline: none;

    font-size: 24px;
`
export const Text = styled.div`
    margin-left: 2px;

    text-align: center;

    overflow: scroll;
    scroll-behavior: smooth;

    -ms-overflow-style: none;

    width: 99%;
    height: 200px;

    &::-webkit-scrollbar {
        display: none;
    }
`
