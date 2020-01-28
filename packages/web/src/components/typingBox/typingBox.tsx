import * as React from "react"

import { Wrapper, Container, Top, Text, Bottom } from "./style"

let string = "" //this is just for testing things I will remove it later.

interface textInnerText {
    content: string
}

const onKey = (e: any, special: string = "undefined") => {
    if (window.event && e != 0) {
        string += String.fromCharCode(e.charCode)
    }
    if (special == "backspace") {
        string = string.slice(0, -1)
    }
    if (special == "enter") {
        console.log(string)
        string = ""
    }
}

const checkBackspaceReturn = (e: any) => {
    onKey(
        0,
        e.keyCode === 8 ? "backspace" : e.keyCode === 13 ? "enter" : "undefined"
    )
}

export const Box = (props: textInnerText) => {
    return (
        <Wrapper>
            <Container>
                <Top>This is something;</Top>
                <Text>
                    {props.content} OK testing overflow let's see how this is
                    handeled OK testing overflow let's see how this is handeled
                    OK testing overflow let's see how this is handeled OK
                    testing overflow let's see how this is handeled OK testing
                    overflow let's see how this is handeled OK testing overflow
                    let's see how this is handeled OK testing overflow let's see
                    how this is handeled OK testing overflow let's see how this
                    is handeled OK testing overflow let's see how this is
                    handeled OK testing overflow let's see how this is handeled
                    OK testing overflow let's see how this is handeled OK
                    testing overflow let's see how this is handeled OK testing
                    overflow let's see how this is handeled OK testing overflow
                    let's see how this is handeled OK testing overflow let's see
                    how this is handeled OK testing overflow let's see how this
                    is handeled OK testing overflow let's see how this is
                    handeled OK testing overflow let's see how this is handeled{" "}
                </Text>
                <Bottom
                    onKeyPress={onKey}
                    onKeyDown={checkBackspaceReturn}
                ></Bottom>
            </Container>
        </Wrapper>
    )
}
