import styled from "@emotion/styled"

export const Wrapper = styled.div`
    width: 100%;
`
export const LetterElement = styled.span`
    display: inline;
    font-size: 28px;
`

export const Container = styled.div`
    width: 500px;
    height: 250px;
    position: relative;

    margin: auto;

    border: 1px solid black;
    border-radius: 3px;
`

export const Top = styled.div`
    text-align: center;
    width: 100%;
    height: 20px;
    border-bottom: 1px solid black;
`

export const Bottom = styled.input`
    width: 100%;

    border-style: solid;
    border-width: 0;
    border-top: 1px solid grey;

    position: absolute;
    bottom: 0;
    left: 0px;

    height: 20px;
    text-align: center;

    outline: none;

    font-size: 18px;
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
