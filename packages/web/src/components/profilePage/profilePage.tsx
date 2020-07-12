import React, { useEffect, useState, useRef } from "react";

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
    Statistics,
    LogoutSwitchThemeWrapper,
    LogoutSwitchButton,
    Description,
    SubmitMessage,
    Select,
    Id,
    ClickMe,
    ChartsWrapper,
    ChartName,
    ChartAndTitleWrapper
} from "./style";

import { GamesChart } from "./components/gamesChart";

import { UserGame } from "./helpers/interfaces";

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
    const [editDescription, setEditDescription] = useState(false);
    const [descriptionEditorValue, setDescriptionEditorValue] = useState("");
    const [changeFlagEditor, setchangeFlagEditor] = useState(false);
    const [userGames, setUserGames] = useState([]);
    const [userPbs, setUserPbs] = useState([]);

    const submitMessageRef = useRef(null);

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
        updateBestScoreUserPbs();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateGeneralStats();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUserGames();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateDescriptionEditorValue();
    }, [userData?.data?.country, userData?.data?.xp]);

    const updateDescriptionEditorValue = () => {
        setDescriptionEditorValue(userData?.data?.description);
    };

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

    const updateUserGames = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUserGames(await getUserGames(userId));
    };

    const updateBestScoreUserPbs = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const userPBS = await getUserPBS(userId);

        console.log(userPBS);

        setUserPbs(userPBS);
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
        console.log(result);

        return await result?.games;
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

    const setDescription = async () => {
        if (descriptionEditorValue.length > 250) {
            submitMessageRef.current.innerHTML =
                "The description can't be longer than 250 characters.";
            return;
        }
        await fetch(`${apiUrl}/users/updatedescription`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: descriptionEditorValue })
        });
        updateUserData();
        setEditDescription(false);
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

    const convertUserGamesData = (dataobject: Array<UserGame>) => {
        const data = dataobject.map(value => {
            const date = new Date(Math.floor(parseInt(value.date)));
            return {
                date: `${date.getDate()}/${date.getMonth() +
                    1}/${date.getFullYear()}`,
                wpm: value.wpm,
                uncorrectedwpm: value.rawwpm,
                accuracy: value.accuracy
            };
        });

        return data;
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
                <LogoutSwitchThemeWrapper>
                    <Id>ID: {getUrlUserId()}</Id>
                    {changeFlagEditor ? (
                        <Select
                            name="countryCode"
                            onChange={e => {
                                setCountryValue(e.target.value);
                            }}
                        >
                            {countryList}
                        </Select>
                    ) : (
                        ""
                    )}
                    <LogoutSwitchButton
                        onClick={async () => {
                            if (!changeFlagEditor) {
                                setchangeFlagEditor(true);
                            } else {
                                await (
                                    await fetch(
                                        `${apiUrl}/users/updateCountry`,
                                        {
                                            method: "POST",
                                            credentials: "include",
                                            headers: {
                                                "Content-Type":
                                                    "application/json"
                                            },
                                            body: JSON.stringify({
                                                country: countryValue
                                            })
                                        }
                                    )
                                ).text();
                                updateCountryFlagUrl();
                                updateUserData();
                                setchangeFlagEditor(false);
                                setCountryValue("AF");
                            }
                        }}
                    >
                        {changeFlagEditor
                            ? `Submit ${countryValue}`
                            : "Change Flag"}
                    </LogoutSwitchButton>
                    <LogoutSwitchButton
                        onClick={() => {
                            switchTheme();
                        }}
                    >
                        Switch Theme
                    </LogoutSwitchButton>
                    <LogoutSwitchButton
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
                    </LogoutSwitchButton>
                </LogoutSwitchThemeWrapper>
                <Description>
                    {editDescription ? (
                        <>
                            <textarea
                                rows={6}
                                cols={68}
                                value={descriptionEditorValue}
                                onChange={e => {
                                    setDescriptionEditorValue(e.target.value);
                                }}
                            ></textarea>
                            <SubmitMessage
                                ref={submitMessageRef}
                            ></SubmitMessage>
                            <LogoutSwitchThemeWrapper>
                                <LogoutSwitchButton
                                    onClick={() => {
                                        setDescription();
                                    }}
                                >
                                    Submit
                                </LogoutSwitchButton>
                                <LogoutSwitchButton
                                    onClick={() => {
                                        setEditDescription(false);
                                        setDescriptionEditorValue(
                                            userData?.data?.description
                                        );
                                    }}
                                >
                                    Cancel
                                </LogoutSwitchButton>
                            </LogoutSwitchThemeWrapper>
                        </>
                    ) : (
                        <div
                            onClick={() => {
                                setEditDescription(true);
                            }}
                        >
                            {userData?.data?.description}
                            <ClickMe>Click me!</ClickMe>
                        </div>
                    )}
                </Description>

                <ChartsWrapper>
                    <ChartAndTitleWrapper>
                        <ChartName>Last 10 Games</ChartName>
                        <GamesChart
                            dataProp={convertUserGamesData(userGames)}
                        ></GamesChart>
                    </ChartAndTitleWrapper>
                    <ChartAndTitleWrapper>
                        <ChartName>All Personal Bests</ChartName>
                        <GamesChart
                            dataProp={convertUserGamesData(userPbs)}
                        ></GamesChart>
                    </ChartAndTitleWrapper>
                </ChartsWrapper>
            </InsideWrapper>
        </Wrapper>
    );
};
