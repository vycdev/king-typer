import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"

const LetterElement = styled.span`
    display: inline;
`

import { Wrapper, Container, Top, Text, Bottom } from "./style"

let string = "" //this is just for testing things I will remove it later.
let increment = 0
let color = "green"

const getText = () => {
    return "this is just some random text to be tested and to see how this works and I think this works fine right?"
}

const buildTextComponentsArray = (text: string, elColor: string) => {
    return text.split(" ").map((word: string, index) => {
        if (index === increment) {
            return (
                <LetterElement style={{ color: elColor }}>
                    {word}{" "}
                </LetterElement>
            )
        }
        return <LetterElement style={{ color: "blue" }}>{word} </LetterElement>
    })
}

const getTextToBeCompared = (text: string) => {
    return text.split(" ")
}

const checkBackspaceReturn = (e: any) => {
    onKey(
        0,
        e.keyCode === 8
            ? "backspace"
            : e.keyCode === 13
            ? "enter"
            : e.keyCode === 32
            ? "space"
            : "undefined"
    )
}
const onKey = (e: any, special: string = "undefined") => {
    if (
        window.event &&
        e != 0 &&
        String.fromCharCode(e.charCode) != " " &&
        String.fromCharCode(e.charCode) != ""
    ) {
        string += String.fromCharCode(e.charCode)
    } else if (special == "backspace") {
        string = string.slice(0, -1)
    } else if (special == "enter") {
        checkAndIncrement()
        string = ""
    } else if (special == "space") {
        checkAndIncrement()
        string = ""
    }
    return string
}
const checkAndIncrement = () => {
    if (string === getTextToBeCompared(getText())[increment]) {
        increment++
        if (increment >= getTextToBeCompared(getText()).length) increment = 0
        color = "green"
    } else {
        console.log(
            string,
            increment,
            getTextToBeCompared(getText())[increment]
        )
        color = "red"
    }
}

const Input = () => {
    const [inner, changeInner] = useState("")
    let text = ""

    return (
        <Bottom
            value={inner}
            onKeyPress={e => changeInner(onKey(e))}
            onKeyDown={e => {
                checkBackspaceReturn(e)
                changeInner(string)
            }}
            onChange={() => {}}
            autoFocus
        ></Bottom>
    )
}

export const Box = () => {
    const [text, updateText] = useState(
        buildTextComponentsArray(getText(), color)
    )

    return (
        <Wrapper>
            <Container
                onKeyDown={e => {
                    updateText(buildTextComponentsArray(getText(), color))
                }}
            >
                <Top>This is something;</Top>
                <Text>{text}</Text>
                <Input></Input>
            </Container>
        </Wrapper>
    )
}
