import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { apiUrl } from "./../../../../utils/constants";

import {
    Wrapper,
    NotLoggedIn,
    ListElement,
    ListTitle,
    ListWrapper,
    TextPreview,
    InsideItemWrapper,
    IdDifficulty,
    Requirements,
    RequirementsTitle,
    Button
} from "./style";

const getAllTutorials = async () => {
    const tutorials = await (
        await fetch(`${apiUrl}/tutorials`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    ).json();
    return tutorials;
};
const getUserId = async () => {
    const result = await (
        await fetch(`${apiUrl}/auth/isloggedin`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    ).json();
    if (result.islogged === false) {
        return "0";
    }
    return result.userid.toString();
};

const getUserData = async (id: string) => {
    if (id === "0" || id === "undefined") return {};
    const userData = await fetch(`${apiUrl}/users/userData/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await userData.json();
};

const MapTutorials = async (id: string) => {
    const tutorials = await getAllTutorials();
    const completedTutorials = (await getUserData(id)).tutorials;

    const completedNonCompleted = tutorials.map(value => {
        return {
            completed: completedTutorials.some(r => value.id === r),
            ...value
        };
    });
    return completedNonCompleted;
};

const generateListOfTutorials = async (id: string) => {
    const tutorials = await MapTutorials(id);

    const list = tutorials.map((value, index) => {
        return (
            <ListElement key={index + value.title} completed={value.completed}>
                <InsideItemWrapper>
                    <ListTitle>{value.title}</ListTitle>
                    <TextPreview>
                        {value.text
                            .split(" ")
                            .slice(0, 13)
                            .join(" ")}
                    </TextPreview>
                    <IdDifficulty completed={value.completed}>
                        ID: {value.id} Difficulty: {value.difficulty}
                    </IdDifficulty>
                    <RequirementsTitle>Requirements:</RequirementsTitle>
                    <Requirements>
                        Accuracy: {value.requirements.acc} Wpm:{" "}
                        {value.requirements.wpm}
                    </Requirements>
                    <Link to={`/type/practice/tutorial/${value.id}`}>
                        <Button>Start</Button>
                    </Link>
                </InsideItemWrapper>
            </ListElement>
        );
    });

    return list;
};

export const Tutorials = () => {
    const [userId, setUserId] = useState("0");
    const [listOfTutorials, setListOfTutorials] = useState([
        <ListElement key="DefaultTutorialItem" completed={false}></ListElement>
    ]);

    const AsyncUpdateState = async () => {
        const userID = await getUserId();

        setUserId(userID);
        setListOfTutorials(await generateListOfTutorials(userID));
    };

    useEffect(() => {
        AsyncUpdateState();
    }, []);

    return (
        <Wrapper>
            {userId === "0" ? (
                <NotLoggedIn>You need to be logged in.</NotLoggedIn>
            ) : (
                <ListWrapper>{listOfTutorials}</ListWrapper>
            )}
        </Wrapper>
    );
};
