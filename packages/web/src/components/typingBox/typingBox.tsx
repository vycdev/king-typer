import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"

const LetterElement = styled.span`
    display: inline;
    font-size: 28px;
`

// TODO

/*
    Make the WPM/CPM calculator work + after calculating delete the text and replace it with some info and a restart button idk 
    Make it autoscroll
    Make it beautiful 
*/

import { Wrapper, Container, Top, Text, Bottom } from "./style"

let string = "" /// I hate mutating stuff
let increment = 0
let color = "green"
let stringFullyBackspaced = false
let charTyped = 0
let correctedCharTyped = 0
let CPM = 0
let WPM = 0

const getText = () => {
    return "like idea until certain always busy so music best self is world dont sentence world next river"
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
                                if (stringFullyBackspaced) {
                                    stringFullyBackspaced = false
                                }

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

const checkAndIncrement = () => {
    if (string === getTextToBeCompared(getText())[increment]) {
        increment++
        if (increment >= getTextToBeCompared(getText()).length) increment = 0 /// This is if the text gets fully typed, might remove later
        charTyped += string.length + 1
        correctedCharTyped += string.length + 1
        color = "green"
    } else {
        correctedCharTyped += string.length + 1
        console.log(
            string,
            increment,
            getTextToBeCompared(getText())[increment]
        )
    }
}

const setCpmWpm = (cpm: number, wpm: number) => {
    CPM = cpm
    WPM = wpm
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
    const [time, setTime] = useState(60)
    const [cpm, setCpm] = useState(0)
    const [wpm, setWpm] = useState(0)
    // const [showButton, setButton] = useState("none")

    if (time === 0) {
        setCpmWpm(cpm, wpm)
    } else if (time === 60 && cpm === 0 && CPM === 0) {
        setCpmWpm(-1, 0)
    }
    const calculateCpmWpm = () => {
        return time === 0
            ? [CPM, WPM]
            : [
                  Math.floor(
                      charTyped / ((60 - time === 0 ? 1 : 60 - time) / 60)
                  ),
                  Math.floor(
                      charTyped / 5 / ((60 - time === 0 ? 1 : 60 - time) / 60)
                  )
              ]
    }
    const resetEverything = () => {
        string = "" /// I hate mutating stuff
        increment = 0
        color = "green"
        stringFullyBackspaced = false
        charTyped = 0
        correctedCharTyped = 0
        CPM = 0
        WPM = 0
    }

    useEffect(() => {
        setTimeout(
            () =>
                setTime(
                    time === 0 ? 0 : CPM === -1 && cpm === 0 ? 60 : time - 1
                ),
            1000
        )
        setTimeout(() => setCpm(calculateCpmWpm()[0]), 1000)
        setTimeout(() => setWpm(calculateCpmWpm()[1]), 1000)
        // setButton(time === 0 ? "inline-block" : "inline-block")
    })

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
                <Top>
                    {"Time left: "}
                    {time}
                    {"   "}
                    {"CPM:"}
                    {cpm}
                    {"   "}
                    {"WPM:"}
                    {wpm}
                    <div
                        style={{
                            display: "inline-block",
                            paddingLeft: "5px"
                        }}
                    >
                        <button
                            onClick={() => {
                                resetEverything()
                                setTime(60)
                                setCpm(0)
                                setWpm(0)
                                updateText(
                                    buildTextComponentsArray(getText(), color)
                                )
                            }}
                        >
                            {"Restart"}
                        </button>
                    </div>
                </Top>
                <Text>{text}</Text>
                <Input></Input>
            </Container>
        </Wrapper>
    )
}
