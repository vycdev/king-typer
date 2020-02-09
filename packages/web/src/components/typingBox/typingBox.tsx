import React, { useState } from "react"
import styled from "@emotion/styled"

const LetterElement = styled.span`
    display: inline;
`

import { Wrapper, Container, Top, Text, Bottom } from "./style"

let string = "" //this is just for testing things I will remove it later.

const getText = () => {
    return "This text was changed just because I wanted it to be changed so yes"
}

const buildTextComponentsArray = (
    text: string,
    elNum: number,
    elColor: string
) => {
    return text.split(/( )/g).map((word: string, index) => {
        if (index === elNum) {
            return (
                <LetterElement style={{ color: elColor }}>{word}</LetterElement>
            )
        }
        return <LetterElement style={{ color: "blue" }}>{word}</LetterElement>
    })
}

const getTextToBeCompared = (text: string) => {
    return text.split(/( )/g)
}

// const checkBackspaceReturn = (e: any) => {
//     onKey(
//         0,
//         e.keyCode === 8
//             ? "backspace"
//             : e.keyCode === 13
//             ? "enter"
//             : e.keyCode === 32
//             ? "space"
//             : "undefined"
//     )
// }
// const onKey = (e: any, special: string = "undefined") => {
//     if (window.event && e != 0) {
//         string += String.fromCharCode(e.charCode)
//         setBottomInner(string)
//     } else if (special == "backspace") {
//         string = string.slice(0, -1)
//         setBottomInner(string)
//     } else if (special == "enter") {
//         console.log(string) /// This log is to be removed later
//         setBottomInner("")
//         string = ""
//     } else if (special == "space") {
//         console.log(string) ///this log is to be removed later
//         if (string === comparableText[iterateThis]) {
//             setTypeText(() =>
//                 buildTextComponentsArray(getText(), iterateThis, "green")
//             )
//             iterateThis += 2
//             console.log(iterateThis, comparableText[iterateThis])
//         }
//         string = ""
//         setBottomInner("")
//     }
//     console.log('"' + string + '"')
// }

const Input = () => {
    const [inner, changeInner] = useState("")

    return <Bottom value={inner} autoFocus></Bottom>
}

export const Box = () => {
    const [bottomInner, setBottomInner] = useState("")
    const [typeText, setTypeText] = useState(
        buildTextComponentsArray(getText(), 0, "green")
    )

    // setBottomInner(() => {})

    return (
        <Wrapper>
            <Container>
                <Top>This is something;</Top>
                <Text>{typeText}</Text>
                <Input></Input>
                <Bottom
                // onKeyPress={onKey}
                // onKeyDown={checkBackspaceReturn}
                // value={bottomInner}
                // onChange={() => {}}
                // autoFocus
                ></Bottom>
            </Container>
        </Wrapper>
    )
}
