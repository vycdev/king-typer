import React, { useState, useEffect } from "react";

import { Wrapper, Container, Top, Text, Bottom, LetterElement } from "./style";

let string = "";
let increment = 0;
let color = "green";
let stringFullyBackspaced = false;
let charTyped = 0;
let correctedCharTyped = 0;
let CPM = 0;
let WPM = 0;

const getText = () => {
    return "A (from the Ancient Greek paragraphos, \"to write beside\" or \"written beside\") is a self-contained unit of a discourse in writing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.";
};

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
    );
};
const onKey = (e: any, special: string = "undefined") => {
    if (
        window.event &&
        e != 0 &&
        String.fromCharCode(e.charCode) != " " &&
        String.fromCharCode(e.charCode) != ""
    ) {
        string += String.fromCharCode(e.charCode);
        stringFullyBackspaced = false;
    } else if (special == "backspace") {
        string = string.slice(0, -1);
        if (string.length === 0) {
            stringFullyBackspaced = true;
        }
    } else if (special == "enter") {
        checkAndIncrement();
    } else if (special == "space") {
        checkAndIncrement();
    }
    return string;
};

const buildTextComponentsArray = (text: string, elColor: string) => {
    const splittedText = text.split(" ");

    return splittedText.map((word: string, index) => {
        if (index <= increment) {
            if (index === increment) {
                return splittedText[increment]
                    .split("")
                    .map((letter: string, i) => {
                        let addSpace = "";
                        if (word.split("").length - 1 === i) {
                            addSpace = " ";
                        }

                        if (
                            string.split("")[i] === letter &&
                            !stringFullyBackspaced
                        ) {
                            return (
                                <LetterElement
                                    key={`${i}letter`}
                                    style={{
                                        color:
                                            string.length > word.length
                                                ? "#e83c3c"
                                                : elColor
                                    }}
                                >
                                    <u>{letter}</u>
                                    {addSpace}
                                </LetterElement>
                            );
                        } else {
                            if (
                                i <= string.split("").length - 1 &&
                                !stringFullyBackspaced
                            ) {
                                return (
                                    <LetterElement
                                        key={`${i}letter`}
                                        style={{ color: "#e83c3c" }}
                                    >
                                        <u>{letter}</u>
                                        {addSpace}
                                    </LetterElement>
                                );
                            } else {
                                if (stringFullyBackspaced) {
                                    stringFullyBackspaced = false;
                                }

                                return (
                                    <LetterElement
                                        key={`${i}letter`}
                                        style={{ color: "black" }}
                                    >
                                        <u>{letter}</u>
                                        {addSpace}
                                    </LetterElement>
                                );
                            }
                        }
                    });
            } else {
                return (
                    <LetterElement key={index} style={{ color: elColor }}>
                        {word}{" "}
                    </LetterElement>
                );
            }
        }
        return (
            <LetterElement key={index} style={{ color: "#0752e8" }}>
                {word}{" "}
            </LetterElement>
        );
    });
};

const getTextToBeCompared = (text: string) => {
    return text.split(" ");
};

const checkAndIncrement = () => {
    if (string === getTextToBeCompared(getText())[increment]) {
        increment++;
        charTyped += string.length + 1;
        correctedCharTyped += string.length + 1;
        color = "green";
        string = "";
    } else {
        correctedCharTyped += string.length + 1;
        console.log(
            string,
            increment,
            getTextToBeCompared(getText())[increment]
        );
    }
};

const setCpmWpm = (cpm: number, wpm: number) => {
    CPM = cpm;
    WPM = wpm;
};

const Input = () => {
    const [inner, changeInner] = useState("");

    return (
        <Bottom
            value={inner}
            onKeyPress={e => changeInner(onKey(e))}
            onKeyDown={e => {
                checkBackspaceReturn(e);
                changeInner(string);
            }}
            onChange={() => {}}
            autoFocus
        ></Bottom>
    );
};

export const Box = () => {
    const [text, updateText] = useState(
        buildTextComponentsArray(getText(), color)
    );
    const [time, setTime] = useState(60);
    const [cpm, setCpm] = useState(0);
    const [wpm, setWpm] = useState(0);

    if (time === 0) {
        setCpmWpm(cpm, wpm);
    } else if (time === 60 && cpm === 0 && CPM === 0) {
        setCpmWpm(-1, 0);
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
              ];
    };
    const resetEverything = () => {
        string = "";
        increment = 0;
        color = "green";
        stringFullyBackspaced = false;
        charTyped = 0;
        correctedCharTyped = 0;
        CPM = 0;
        WPM = 0;
    };

    useEffect(() => {
        setTimeout(() => {
            setTime(
                time === 0 || increment >= getTextToBeCompared(getText()).length
                    ? 0
                    : CPM === -1 && cpm === 0
                    ? 60
                    : time - 1
            );
            setCpm(calculateCpmWpm()[0]);
            setWpm(calculateCpmWpm()[1]);
        }, 1000);
    });

    return (
        <Wrapper>
            <Container
                onKeyDown={() => {
                    updateText(buildTextComponentsArray(getText(), color));
                }}
                onKeyPress={() => {
                    updateText(buildTextComponentsArray(getText(), color));
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
                            style={{
                                height: "20px"
                            }}
                            onClick={() => {
                                resetEverything();
                                setTime(60);
                                setCpm(0);
                                setWpm(0);
                                updateText(
                                    buildTextComponentsArray(getText(), color)
                                );
                            }}
                        >
                            {"Try again"}
                        </button>
                    </div>
                </Top>
                <Text>{text}</Text>
                <Input></Input>
            </Container>
        </Wrapper>
    );
};
