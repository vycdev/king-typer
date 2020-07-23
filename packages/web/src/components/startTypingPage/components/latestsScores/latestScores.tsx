import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../../utils/constants";
import { ListItem, ListTitle } from "./style";
import { Link } from "react-router-dom";

interface Game {
    gameid: number;
    userid: number;
    date: number;
    wpm: number;
    rawwpm: number;
    accuracy: number;
}

interface PB {
    userid: number;
    date: number;
    wpm: number;
    rawwpm: number;
    accuracy: number;
}

const getLatestScores = async () => {
    const result: Array<Game> = await (
        await fetch(`${apiUrl}/games/`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    ).json();
    return result
        .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
        .slice(0, 10);
};

const getLatestPBs = async () => {
    const result: Array<PB> = await (
        await fetch(`${apiUrl}/games/getAllPbs`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    ).json();
    return result
        .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
        .slice(0, 10);
};
const getUserData = async (id: string) => {
    if (id === "0") return {};
    const userData = await fetch(`${apiUrl}/users/userData/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await userData.json();
};

const generateLinkAndName = async (id: number) => {
    const userName = (await getUserData(id.toString())).name;

    return <Link to={`/profile/${id}`}>{userName}</Link>;
};

// TODO: Maybe add top users by average wpm

export const LatestScores = () => {
    const [latestScores, setLatestScores] = useState<Array<Game>>([]);
    const [latestPBs, setLatestPBs] = useState<Array<PB>>([]);
    const [elementListScores, setElementListScores] = useState([
        <ListItem key="defaultScoresList">Loading...</ListItem>
    ]);
    const [elementListPbs, setElementListPbs] = useState([
        <ListItem key="defaultPbsList">Loading...</ListItem>
    ]);

    const GenerateList = async data => {
        const list = await Promise.all(
            data.map(async (value, index) => {
                const date = new Date(Math.floor(parseInt(value.date)));
                const UserNameLink = await generateLinkAndName(value.userid);
                return (
                    <ListItem key={index + value.date}>
                        {UserNameLink} WPM: {value.wpm} Acc: {value.accuracy}{" "}
                        Date: {date.toLocaleString("en-GB")}
                    </ListItem>
                );
            })
        );
        return list;
    };

    const UpdateLatest = async () => {
        setLatestPBs(await getLatestPBs());
        setLatestScores(await getLatestScores());

        setElementListPbs(await GenerateList(latestPBs));
        setElementListScores(await GenerateList(latestScores));
    };
    useEffect(() => {
        UpdateLatest();
    }, [elementListScores.length === 1, setElementListPbs.length === 1]);

    return (
        <>
            <ListTitle> Most Recent Scores</ListTitle>
            {elementListScores}
            <ListTitle> Most Recent PBs</ListTitle>
            {elementListPbs}
        </>
    );
};
