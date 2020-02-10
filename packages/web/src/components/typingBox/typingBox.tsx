import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"

const LetterElement = styled.span`
    display: inline;
    font-size: 28px;
`

// TODO

/*
    Make the WPM/CPM calculator work
    Make it into individual letters
    Make it autoscroll
    Make it beautiful 
    Make the code beautiful
*/

import { Wrapper, Container, Top, Text, Bottom } from "./style"

let string = "" //this is just for testing things I will remove it later.
let increment = 0
let color = "green"
let stringFullyBackspaced = false

const getText = () => {
    return "this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right this is just some random text to be tested and to see how this works and i think this works fine right "
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
        stringFullyBackspaced = false
    } else if (special == "backspace") {
        string = string.slice(0, -1)
        if (string.length === 0) {
            stringFullyBackspaced = true
            // console.log(stringFullyBackspaced)
        }
    } else if (special == "enter") {
        checkAndIncrement()
        string = ""
    } else if (special == "space") {
        checkAndIncrement()
        string = ""
    }
    return string
}

const buildTextComponentsArray = (text: string, elColor: string) => {
    const splittedText = text.split(" ")
    // console.log(string)

    return splittedText.map((word: string, index) => {
        if (index <= increment) {
            if (index === increment) {
                return splittedText[increment]
                    .split("")
                    .map((letter: string, i) => {
                        let addSpace = ""
                        if (word.split("").length - 1 === i) {
                            addSpace = " "
                        }
                        if (
                            string.split("")[i] === letter &&
                            !stringFullyBackspaced
                        ) {
                            // console.log(stringFullyBackspaced, "1")

                            return (
                                <LetterElement
                                    key={`${i}letter`}
                                    style={{ color: elColor }}
                                >
                                    <u>{letter}</u>
                                    {addSpace}
                                </LetterElement>
                            )
                        } else {
                            if (
                                i <= string.split("").length - 1 &&
                                !stringFullyBackspaced
                            ) {
                                return (
                                    <LetterElement
                                        key={`${i}letter`}
                                        style={{ color: "red" }}
                                    >
                                        <u>{letter}</u>
                                        {addSpace}
                                    </LetterElement>
                                )
                            } else {
                                if (stringFullyBackspaced)
                                    stringFullyBackspaced = false
                                return (
                                    <LetterElement
                                        key={`${i}letter`}
                                        style={{ color: "black" }}
                                    >
                                        <u>{letter}</u>
                                        {addSpace}
                                    </LetterElement>
                                )
                            }
                        }
                    })
            } else {
                return (
                    <LetterElement key={index} style={{ color: elColor }}>
                        {word}{" "}
                    </LetterElement>
                )
            }
        }
        return (
            <LetterElement key={index} style={{ color: "blue" }}>
                {word}{" "}
            </LetterElement>
        )
    })
}

const getTextToBeCompared = (text: string) => {
    return text.split(" ")
}

// const timer = (startStop: boolean)=>{
//     if(startStop){
//         setTimeout(()={

//         }, 60000)
//     }else{
//         return
//     }
// }

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
    }
}

const Input = () => {
    const [inner, changeInner] = useState("")

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
                onKeyDown={() => {
                    updateText(buildTextComponentsArray(getText(), color))
                }}
                onKeyPress={() => {
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
