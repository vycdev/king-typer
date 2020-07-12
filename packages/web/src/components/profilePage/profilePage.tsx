import React, { useEffect, useState } from "react";

import { apiUrl } from "../../utils/constants";

import {
    Wrapper,
    InsideWrapper,
    ProfileName,
    FlagImage,
    Name,
    FlagNameGroup,
    UnderName,
    GeneralStatistics,
    Statistics
} from "./style";

export const ProfilePage = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userid"));
    const [countryList, setCountryList] = useState(
        <option key={"default"}>Loading...</option>
    );
    const [countryValue, setCountryValue] = useState("AF");
    const [userData, setUserData] = useState({});
    const [countryFlagUrl, setCountryFlagUrl] = useState(
        "https://restcountries.eu/data/usa.svg"
    );
    const [level, setLevel] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameGeneralStats, setGameGeneralStats] = useState({
        averageAccuracy: 0,
        averageWpm: 0
    });

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateCountryList();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUserId();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUserData();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateCountryFlagUrl();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateLevel();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateBestScore();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateGeneralStats();
    }, [userData?.data?.country, userData?.data?.xp]);

    const updateCountryList = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setCountryList(await generateCountryOptions());
    };

    const updateUserData = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUserData(await getUserData(userId));
    };

    const updateUserId = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUserId(localStorage.getItem("userid"));
    };

    const updateCountryFlagUrl = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setCountryFlagUrl(await getCountryUrlFlag());
    };

    const updateLevel = () => {
        setLevel(Math.sqrt(userData?.data?.exp / 10));
    };

    const updateBestScore = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const userPBS = await getUserPBS(userId);

        setBestScore(userPBS[userPBS.length - 1]?.wpm);
    };

    const updateGeneralStats = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const generalStats = await getUserGameStats(userId);

        setGameGeneralStats({
            averageAccuracy: generalStats?.averageAccuracy,
            averageWpm: generalStats?.averageWPM
        });
    };

    const getUserPBS = async (id: string) => {
        const result = await (
            await fetch(`${apiUrl}/users/userpbs/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();

        return await result;
    };

    const getUserGames = async (id: string) => {
        const result = await (
            await fetch(`${apiUrl}/users/usergames/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();

        return await result;
    };

    const getUserGameStats = async (id: string) => {
        const result = await (
            await fetch(`${apiUrl}/users/usergamestats/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();

        return await result;
    };

    const getCountryUrlFlag = async () => {
        const data = await (
            await fetch(
                `https://restcountries.eu/rest/v2/alpha/${userData?.data?.country}`,
                {
                    method: "GET"
                }
            )
        ).json();

        return data.flag;
    };

    const getUserData = async (id: string) => {
        const userData = await fetch(`${apiUrl}/users/userData/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await userData.json();
    };

    const generateCountryOptions = async () => {
        const data = await (
            await fetch("https://restcountries.eu/rest/v2", {
                method: "GET"
            })
        ).json();

        const generated = data.map((value, index) => {
            return (
                <option key={index + value.alpha2Code} value={value.alpha2Code}>
                    {value.name}
                </option>
            );
        });

        return generated;
    };

    const getUrlUserId = () => {
        return location.hash.split("/")[location.hash.split("/").length - 1];
    };

    const switchTheme = () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "light") {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        location.reload();
    };
    //  if no flag exists then use :flag_white:
    return (
        <Wrapper>
            <InsideWrapper>
                <ProfileName>
                    <FlagNameGroup>
                        <FlagImage src={countryFlagUrl}></FlagImage>
                        <Name>{userData?.data?.name}</Name>
                    </FlagNameGroup>

                    <GeneralStatistics>
                        <UnderName>
                            {userData?.data?.role.charAt(0).toUpperCase() +
                                userData?.data?.role.slice(1)}{" "}
                            Level: {level}
                        </UnderName>

                        <Statistics>
                            Best Score: {bestScore} Average WPM:{" "}
                            {gameGeneralStats.averageWpm} Average Accuracy:{" "}
                            {gameGeneralStats.averageAccuracy} Total Tests
                            Taken: {userData?.data?.totaltests}
                        </Statistics>
                    </GeneralStatistics>
                </ProfileName>
                <button
                    onClick={async () => {
                        await fetch(`${apiUrl}/auth/logout`, {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        location.replace("");
                    }}
                >
                    Logout
                </button>
                <button
                    onClick={() => {
                        switchTheme();
                    }}
                >
                    Switch Theme
                </button>
                <button
                    onClick={async () => {
                        await (
                            await fetch(`${apiUrl}/users/updateCountry`, {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ country: countryValue })
                            })
                        ).text();
                        updateCountryFlagUrl();
                        updateUserData();
                    }}
                >
                    UpdateCountry to {countryValue}
                </button>
                <select
                    name="countryCode"
                    onChange={e => {
                        setCountryValue(e.target.value);
                    }}
                >
                    {countryList}
                </select>
                <button
                    onClick={() => {
                        console.log(getUrlUserId());
                        console.log(userData);
                        console.log(level);
                    }}
                >
                    Test State
                </button>
            </InsideWrapper>
        </Wrapper>
    );
};
