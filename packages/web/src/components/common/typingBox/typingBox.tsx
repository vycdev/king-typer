import React, { useState, useEffect, useRef } from "react";

import { getText } from "./helpers/gettext";
import { typingBoxProps, typedArrayInterface } from "./helpers/interfaces";
import { previousScoresType } from "../../statisticsPage/helpers/interfaces";
import { DataBox } from "./components/testChart";
import { PreviousScoresChart } from "../../statisticsPage/components/previousScoresChart";

import {
    Wrapper,
    Container,
    Displayer,
    TextBox,
    InputBox,
    TryAgainButton,
    ActuallyTyped
} from "./style";

const bestwpm = JSON.parse(localStorage.getItem("bestwpm"));
const previousScores: Array<previousScoresType> = JSON.parse(
    localStorage.getItem("previousScores")
);

export const TypingBox = (props: typingBoxProps) => {
    const [input, setInput] = useState("");
    const [text, setText] = useState(getText(props.mode));
    const [visibleText, setVisibleText] = useState([
        <div key={"default"}></div>
    ]);
    const [typed, setTyped] = useState<Array<typedArrayInterface>>([]);
    const [time, setTime] = useState(60);
    const [cpm, setCpm] = useState(0);

    const textBoxRef = useRef(null);

    useEffect(() => {
        setVisibleText(generateVisibleText(input, props.mode, typed));
    }, []);

    const getBestWpm = () => {
        if (time <= 0) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            const yyyy = today.getFullYear();

            previousScores.push({
                date: `${dd}/${mm}/${yyyy}`,
                wpm: cpm / 5,
                uncorrectedwpm:
                    Math.floor(
                        (((cpm === 0 ? 0 : cpm / getAccuracy(typed)) * 100) /
                            5) *
                            100
                    ) / 100,
                accuracy: getAccuracy(typed)
            });

            localStorage.setItem(
                "previousScores",
                JSON.stringify(previousScores)
            );
        }
        if (time <= 0 && bestwpm < cpm / 5) {
            localStorage.setItem("bestwpm", JSON.stringify(cpm / 5));
            return cpm / 5;
        }
        return bestwpm;
    };
    const getWrongWords = () => {
        const WrongWords = [];
        typed.map((value: typedArrayInterface, index: number) => {
            if (value.state === "wrong") {
                WrongWords.push(
                    <div key={value.word + index}>
                        {`You typed "${text[index]}" as "${value.word}".`}
                    </div>
                );
            }
        });
        return WrongWords;
    };
    const getCpm = (
        array: Array<typedArrayInterface>,
        time: number
    ): number => {
        const charTyped = array
            .map((value: typedArrayInterface) => {
                return value.state === "correct" ? value.word.length + 1 : 0;
            })
            .reduce((previous: number, current: number) => {
                return previous + current;
            }, 0);

        return Math.floor(charTyped / ((60 - time === 0 ? 1 : 60 - time) / 60));
    };

    const getAccuracy = (array: Array<typedArrayInterface>): number => {
        let numberOfWrongWords = 0;
        let numberOfCorrectWords = 0;
        for (let value of array) {
            value.state === "correct"
                ? numberOfCorrectWords++
                : numberOfWrongWords++;
        }

        return (
            Math.floor(
                (numberOfCorrectWords /
                    (array.length != 0 ? array.length : 1)) *
                    10000
            ) / 100
        );
    };
    const generateVisibleText = (
        input: string,
        mode: string,
        typedArray: Array<typedArrayInterface>
    ) => {
        return text.map((value: string, index: number) => {
            return index < typedArray.length ? (
                <div
                    className="spaced"
                    key={value + index}
                    style={{
                        color:
                            typedArray[index].state === "correct"
                                ? props.colorCodes.correct
                                : props.colorCodes.wrong
                    }}
                >
                    {text[index]}
                </div>
            ) : index === typedArray.length ? (
                <div
                    className="spaced isBeingTyped"
                    id="isBeingTyped"
                    key={value + index}
                >
                    {text[index].split("").map((v: string, i: number) => {
                        return (
                            <div
                                key={v + i + v}
                                style={{
                                    color:
                                        i <= input.length - 1
                                            ? v === input[i]
                                                ? props.colorCodes.correct
                                                : props.colorCodes.wrong
                                            : props.colorCodes.notTyped
                                }}
                            >
                                {v}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    className="spaced"
                    key={value + index}
                    style={{ color: props.colorCodes.notTyped }}
                >
                    {text[index]}
                </div>
            );
        });
    };

    return (
        <Wrapper>
            <Container>
                <Displayer>
                    Your best: {getBestWpm()} | WPM: {Math.floor(cpm / 5)} |
                    CPM: {cpm} | Time: {time}
                    {"  "}
                    {time > 0 ? (
                        ""
                    ) : (
                        <TryAgainButton
                            onClick={() => {
                                history.go(0);
                            }}
                        >
                            Try again
                        </TryAgainButton>
                    )}
                </Displayer>
                {time > 0 ? "" : <DataBox dataProp={typed}></DataBox>}
                {time > 0 ? (
                    ""
                ) : (
                    <div>
                        <ActuallyTyped>
                            {Math.floor(cpm / 5) ===
                                Math.floor(
                                    typed[typed.length - 1].uncorrectedwpm
                                ) && cpm != 0
                                ? `Congratulations, you typed with ${cpm /
                                      5} WPM with no mistakes!`
                                : `You typed ${
                                      typed[typed.length - 1].uncorrectedwpm
                                  } WPM out of which
                            ${cpm /
                                5} WPM were correct and you had ${getAccuracy(
                                      typed
                                  )}% accuracy.`}
                            {getWrongWords()}
                        </ActuallyTyped>
                    </div>
                )}
                <TextBox
                    style={{ display: time > 0 ? "" : "none" }}
                    ref={textBoxRef}
                >
                    {visibleText}
                </TextBox>
                <InputBox
                    style={{ display: time > 0 ? "" : "none" }}
                    readOnly={!(time > 0)}
                    autoFocus
                    value={input}
                    onChange={(e: any) => {
                        const timeLeft = typed.length
                            ? 60 -
                                  Math.floor(
                                      performance.now() / 1000 - typed[0].time
                                  ) >
                              0
                                ? 60 -
                                  Math.floor(
                                      performance.now() / 1000 - typed[0].time
                                  )
                                : 0
                            : 60;

                        const CPM = typed.length
                            ? getCpm(typed, timeLeft)
                            : cpm;

                        const typedArray: Array<typedArrayInterface> =
                            e.target.value[e.target.value.length - 1] === " " ||
                            time <= 0
                                ? [
                                      ...typed,
                                      {
                                          word: e.target.value.replace(
                                              / +/g,
                                              ""
                                          ),
                                          state:
                                              e.target.value.replace(
                                                  / +/g,
                                                  ""
                                              ) === text[typed.length]
                                                  ? "correct"
                                                  : "wrong",
                                          time: performance.now() / 1000,
                                          wpm: CPM / 5,
                                          uncorrectedwpm:
                                              Math.floor(
                                                  (((CPM === 0
                                                      ? 0
                                                      : CPM /
                                                        getAccuracy(typed)) *
                                                      100) /
                                                      5) *
                                                      100
                                              ) / 100,
                                          accuracy: getAccuracy(typed),
                                          timeUsed: 60 - timeLeft + "s"
                                      }
                                  ]
                                : typed;
                        const input =
                            e.target.value[e.target.value.length - 1] === " "
                                ? ""
                                : e.target.value;

                        setInput(input);
                        setTyped(typedArray);
                        setVisibleText(
                            generateVisibleText(input, props.mode, typedArray)
                        );
                        setTime(timeLeft);
                        setCpm(CPM);

                        const elm = document.getElementById("isBeingTyped");
                        if (elm) {
                            textBoxRef.current.scrollTop = elm.offsetTop - 60;
                        }
                    }}
                ></InputBox>
            </Container>
        </Wrapper>
    );
};