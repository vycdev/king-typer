import React, { useState, useEffect, useRef } from "react";

import { randomizeEasyText, getDataBaseTextInfo } from "./helpers/gettext";
import { TypingBoxProps, TypedArrayInterface } from "./helpers/interfaces";
import { PreviousScoresType } from "../../statisticsPage/helpers/interfaces";
import { DataBox } from "./components/testChart";

import { apiUrl } from "../../../utils/constants";

import {
    Wrapper,
    Container,
    Displayer,
    TextBox,
    InputBox,
    TryAgainButton,
    ActuallyTyped,
    BlockOfFinishedText
} from "./style";

interface TextInfo {
    id: number;
    title: string;
    text: string;
    ordered?: boolean;
    tutorial: boolean;
}

// This file contains the page for the typing test.

// Parse the best wpm and the previous scores from local storage
const previousScores: Array<PreviousScoresType> = JSON.parse(
    localStorage.getItem("previousScores")
);

export const TypingBox = (props: TypingBoxProps) => {
    const [input, setInput] = useState("");
    const [text, setText] = useState([""]);
    const [visibleText, setVisibleText] = useState([
        <div key={"default"}></div>
    ]);
    const [typed, setTyped] = useState<Array<TypedArrayInterface>>([]);
    const [time, setTime] = useState(60);
    const [cpm, setCpm] = useState(0);
    const [bestwpm, setBestwpm] = useState(
        JSON.parse(localStorage.getItem("bestwpm"))
    );
    const [textInfo, setTextInfo] = useState<TextInfo>({
        id: 0,
        title: "",
        text: "",
        tutorial: false
    });
    const [wasTypedWrong, setWasTypedWrong] = useState(false);

    const textBoxRef = useRef(null);

    // Initialize the visible text that has to be typed.
    useEffect(() => {
        textBoxRef.current.scrollTop = 0;
        setBestwpm(JSON.parse(localStorage.getItem("bestwpm")));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateText();

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateBestScore();
    }, [time >= 60]);

    const getUserBestScore = async (id: string) => {
        if (id === "0") return [];
        const result = await (
            await fetch(`${apiUrl}/users/userpbs/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();

        return (await result.message) ? 0 : result[result.length - 1]?.wpm;
    };

    const updateBestScore = async () => {
        setBestwpm(await getUserBestScore(localStorage.getItem("userid")));
    };

    const addGameToDb = async (
        wpm: number,
        rawwpm: number,
        accuracy: number,
        difficulty: number,
        textid: number
    ) => {
        const newGame = await fetch(`${apiUrl}/games/newGame`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wpm,
                rawwpm,
                accuracy,
                difficulty,
                textid
            })
        });

        console.log(await newGame.json());
    };

    const updateText = async (forceUpdate = false) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const gotTextInfo =
            time >= 60 ? await getDataBaseTextInfo(props.mode) : textInfo;

        const info =
            (time >= 60 && textInfo.title != gotTextInfo.title) || forceUpdate
                ? gotTextInfo
                : textInfo;

        const arrayOfText =
            props.mode === "easy"
                ? time >= 60
                    ? randomizeEasyText(info.text.split(" "))
                    : info.text.split(" ")
                : info.text.split(" ");

        setTextInfo(time >= 60 ? info : textInfo);
        setText(time >= 60 ? arrayOfText : text);

        setVisibleText(
            time >= 60
                ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  generateVisibleText("", props.mode, [], arrayOfText)
                : visibleText
        );
    };

    // Function for reseting the state to the initial value
    const resetState = async () => {
        setTime(60);

        await updateText(true);

        const elm = document.getElementById("isBeingTyped");
        if (elm) {
            textBoxRef.current.scrollTop = 0;
        }
        setInput("");
        setTyped([]);
        setCpm(0);
    };
    // Get best wpm function, returns the best wpm and also sets the next score in local storage and the best wpm
    const getBestWpm = () => {
        if (time <= 0) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
            const yyyy = today.getFullYear();

            previousScores.push({
                date: `${dd}/${mm}/${yyyy}`,
                wpm: cpm / 5,
                uncorrectedwpm:
                    Math.floor(
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        (((cpm === 0 ? 0 : cpm / getAccuracy(typed)) * 100) /
                            5) *
                            100
                    ) / 100,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                accuracy: getAccuracy(typed)
            });

            addGameToDb(
                props.mode === "easy"
                    ? cpm / 5
                    : Math.floor(
                          // eslint-disable-next-line @typescript-eslint/no-use-before-define
                          (((cpm === 0 ? 0 : cpm / getAccuracy(typed)) * 100) /
                              5) *
                              100
                      ) / 100,
                Math.floor(
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    (((cpm === 0 ? 0 : cpm / getAccuracy(typed)) * 100) / 5) *
                        100
                ) / 100,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                getAccuracy(typed),
                parseInt(textInfo.difficulty),
                parseInt(textInfo.id)
            );

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
    // Function to generate the array of elements which contains the words that were typed wrong
    // These elements are shown after the test in the care that the user didn't type with 100% accuracy
    const getWrongWords = () => {
        const WrongWords = [];
        typed.map((value: TypedArrayInterface, index: number) => {
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

    const generateFinishedBlockOfText = () => {
        const arrayOfText = typed.map(
            (value: TypedArrayInterface, index: number) => {
                return (
                    <span
                        key={index + value.state + value.word}
                        style={{
                            color:
                                value.state === "correct"
                                    ? props.colorCodes.correct
                                    : props.colorCodes.wrong
                        }}
                    >
                        {value.word}{" "}
                    </span>
                );
            }
        );

        return <BlockOfFinishedText>{arrayOfText}</BlockOfFinishedText>;
    };
    // This function returns the cpm at any given moment of the test
    const getCpm = (
        array: Array<TypedArrayInterface>,
        time: number
    ): number => {
        const charTyped = array
            .map((value: TypedArrayInterface) => {
                return value.state === "correct" ? value.word.length + 1 : 0;
            })
            .reduce((previous: number, current: number) => {
                return previous + current;
            }, 0);

        return Math.floor(charTyped / ((60 - time === 0 ? 1 : 60 - time) / 60));
    };

    // This function return the accuracy at any given moment of the test
    const getAccuracy = (array: Array<TypedArrayInterface>): number => {
        let numberOfWrongWords = 0;
        let numberOfCorrectWords = 0;
        for (const value of array) {
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
    // This function generates the text that is being typed.
    // It also takes care of the text highlighting and of every word that is being typed.
    const generateVisibleText = (
        input: string,
        mode: string,
        typedArray: Array<TypedArrayInterface>,
        text: Array<string>
    ) => {
        if (!(text instanceof Array)) {
            return [];
        } else
            return text.map((value: string, index: number) => {
                return index < typedArray.length ? (
                    <div
                        className="spaced"
                        key={value + index}
                        style={{
                            color:
                                typedArray[index].state === "correct"
                                    ? props.colorCodes.correct
                                    : props.mode === "hard"
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
                            if (i <= input.length - 1 && v != input[i])
                                setWasTypedWrong(true);
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
        // wrapper component of the page
        <Wrapper>
            {/* container of typing box */}
            <Container>
                {/* component that displays the current statistics for the test, including time, wpm and cpm, also the try again button that is shown at the end of the test*/}
                <Displayer>
                    Your best: {getBestWpm()} | WPM: {Math.floor(cpm / 5)} |
                    CPM: {cpm} | Time: {time}
                    {"  "}
                    <TryAgainButton
                        onClick={() => {
                            resetState();
                        }}
                    >
                        Try again
                    </TryAgainButton>
                </Displayer>
                {/* Chart with the stats for the test that is rendered only after the time reached 0 + other informative components that do the same*/}
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
                            ${cpm / 5} WPM were ${
                                      props.mode === "easy"
                                          ? "correct"
                                          : "typed with 100% accuracy"
                                  } and you had ${getAccuracy(
                                      typed
                                  )}% accuracy.`}
                            {props.mode === "easy"
                                ? getWrongWords()
                                : generateFinishedBlockOfText()}
                        </ActuallyTyped>
                    </div>
                )}
                {/* text box component that shows the text that has to be typed, it aslo disappears when the timer reaches 0 */}
                <TextBox
                    style={{ display: time > 0 ? "" : "none" }}
                    ref={textBoxRef}
                >
                    {visibleText}
                </TextBox>
                {/* input box that handles all the event, also dissapears when timer reaches 0 */}
                <InputBox
                    style={{ display: time > 0 ? "" : "none" }}
                    readOnly={!(time > 0)}
                    autoFocus
                    value={input}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                        // On change event, this is the only event in this component and it handles everything about the test.
                        // input is the current value of the input box
                        const input =
                            e.target.value[e.target.value.length - 1] === " "
                                ? props.mode === "hard"
                                    ? e.target.value.replace(/ +/g, "") ===
                                      text[typed.length]
                                        ? ""
                                        : e.target.value
                                    : ""
                                : e.target.value;
                        // timeLeft is the calculated remaining time
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
                        // CPM is the now cpm
                        const CPM = typed.length
                            ? getCpm(typed, timeLeft)
                            : cpm;

                        if (
                            e.target.value[e.target.value.length - 1] === " " &&
                            time >= 0 &&
                            typed.length < text.length &&
                            e.target.value != " " &&
                            (props.mode === "hard"
                                ? e.target.value.replace(/ +/g, "") ===
                                  text[typed.length]
                                : true)
                        )
                            setWasTypedWrong(false);

                        // typed array is an array of objects that contans info about every second of the test
                        const typedArray: Array<TypedArrayInterface> =
                            e.target.value[e.target.value.length - 1] === " " &&
                            time >= 0 &&
                            typed.length < text.length &&
                            e.target.value != " " &&
                            (props.mode === "hard"
                                ? e.target.value.replace(/ +/g, "") ===
                                  text[typed.length]
                                : true)
                                ? [
                                      ...typed,
                                      {
                                          word: e.target.value.replace(
                                              / +/g,
                                              ""
                                          ),
                                          state:
                                              props.mode === "hard"
                                                  ? wasTypedWrong
                                                      ? "wrong"
                                                      : "correct"
                                                  : e.target.value.replace(
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
                        //   setting the input
                        setInput(input);
                        // setting the typedArray state
                        setTyped(typedArray);
                        // generating the visible text and setting it
                        setVisibleText(
                            generateVisibleText(
                                input,
                                props.mode,
                                typedArray,
                                text
                            )
                        );
                        // setting the time to the time left
                        setTime(
                            typedArray.length >= text.length ? 0 : timeLeft
                        );
                        // setting the now cpm
                        setCpm(CPM);
                        // handeling the automatic scrolling of the text
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
