import * as React from "react"

import styled from "@emotion/styled"

function onKey(e) {
    if (window.event) {
        console.log(String.fromCharCode(e.charCode))
    }
}

const Wrapper = styled.div`
    width: 100%;
`

const Container = styled.div`
    width: 500px;
    height: 200px;
    position: relative;

    margin: auto;

    border: 1px solid black;
    border-radius: 3px;
`

const Top = styled.div`
    width: 100%;
    height: 20px;
    border-bottom: 1px solid black;
`

const Bottom = styled.input`
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
const Text = styled.div`
    font-size: 18px;

    width: 100%;
    height: 180px;
`

export default class box extends React.Component {
    render() {
        return (
            <Wrapper>
                <Container>
                    <Top>This is something;</Top>
                    <Text></Text>
                    <Bottom onKeyPress={onKey}></Bottom>
                </Container>
            </Wrapper>
        )
    }
}
