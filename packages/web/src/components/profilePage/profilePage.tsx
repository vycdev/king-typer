import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import { apiUrl } from "../../utils/constants";

import { getTheme } from "../../utils/getTheme";

const theme = getTheme();

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
    ChartAndTitleWrapper,
    ListItem,
    ListItemWrapper,
    NoGameData,
    InsideAchievementListItem,
    AchievementsTitle
} from "./style";
import { UserGame } from "./helpers/interfaces";
import { GamesChart } from "./components/gamesChart";
import { ChangePassword } from "./components/changePassword/changePassword";

export const ProfilePage = () => {
    const [userId, setUserId] = useState("0");
    const [countryList, setCountryList] = useState([
        <option key={"default"}>Loading...</option>
    ]);
    const [countryValue, setCountryValue] = useState("AF");
    const [userData, setUserData] = useState({
        achievements: [],
        country: "",
        description: "",
        email: "",
        exp: 0,
        role: "",
        id: 0,
        name: "",
        totaltests: 0,
        tutorials: []
    });
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
    const [elementsListOfGames, setElementsListOfGames] = useState([
        <ListItem key="defaultListItem">
            There seems to be no game data.
        </ListItem>
    ]);
    const [elementsListOfPBS, setElementsListOfPBS] = useState([
        <ListItem key="defaultListItemPB">
            There seems to be no game data.
        </ListItem>
    ]);
    const [listOfAchievements, setListOfAchievements] = useState([
        <ListItem key="defaultListItemAchievemetns">
            There seems to be no achievements data.
        </ListItem>
    ]);
    const [verificationIsSent, setVerificationIsSent] = useState(false);
    const [isThisTheLoggedUser, setIsThisTheLoggedUser] = useState(false);
    const [urlUserId, setUrlUserId] = useState("0");
    const [userExists, setUserExists] = useState(false);
    const [changePassword, setChangePassword] = useState(true);

    const submitMessageRef = useRef(null);

    const locatione = useLocation();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUserId();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateIsThisTheLoggedUser();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUrlUserId();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateCountryList();
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
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateElementListOfGames();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateElementListOfPBS();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateListOfAchievements();
    }, [
        locatione.pathname,
        userData?.country,
        userGames?.length,
        urlUserId,
        isThisTheLoggedUser,
        userId
    ]);

    const updateListOfAchievements = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setListOfAchievements(await generateListOfAchievements());
    };

    const updateIsThisTheLoggedUser = async () => {
        setIsThisTheLoggedUser(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            localStorage.getItem("userid") === getUrlUserId()
        );
    };

    const updateUrlUserId = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUrlUserId(getUrlUserId().toString());
    };

    const updateDescriptionEditorValue = () => {
        setDescriptionEditorValue(
            userData?.description === null ? "" : userData?.description
        );
    };

    const updateCountryList = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setCountryList(await generateCountryOptions());
    };

    const updateUserData = async () => {
        setUserData(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await getUserData(
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                localStorage.getItem("userid") === getUrlUserId()
                    ? userId
                    : // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      getUrlUserId()
            )
        );
    };

    const updateUserId = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        localStorage.setItem("userid", await getUserId());

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUserId(localStorage.getItem("userid"));
    };

    const updateCountryFlagUrl = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setCountryFlagUrl(await getCountryUrlFlag());
    };

    const updateLevel = () => {
        setLevel(Math.floor(Math.sqrt(userData?.exp / 10) * 100) / 100);
    };

    const updateUserGames = async () => {
        setUserGames(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await getUserGames(
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                localStorage.getItem("userid") === getUrlUserId()
                    ? userId
                    : // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      getUrlUserId()
            )
        );
    };

    const updateElementListOfGames = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setElementsListOfGames(await generateListOfScores(userGames));
    };

    const updateElementListOfPBS = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setElementsListOfPBS(await generateListOfScores(userPbs));
    };

    const updateBestScoreUserPbs = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const userPBS = await getUserPBS(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            localStorage.getItem("userid") === getUrlUserId()
                ? userId
                : // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  getUrlUserId()
        );

        setUserPbs(userPBS);
        setBestScore(userPBS.message ? 0 : userPBS[userPBS.length - 1]?.wpm);
    };

    const updateGeneralStats = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const generalStats = await getUserGameStats(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            localStorage.getItem("userid") === getUrlUserId()
                ? userId
                : // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  getUrlUserId()
        );

        setGameGeneralStats({
            averageAccuracy: generalStats.message
                ? 0
                : generalStats?.averageAccuracy,
            averageWpm: generalStats.message ? 0 : generalStats?.averageWPM
        });
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
            return "undefined";
        }
        return result.userid;
    };

    const getUserPBS = async (id: string) => {
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

        return await result;
    };

    const getUserGames = async (id: string) => {
        if (id === "0") return [];
        const result = await (
            await fetch(`${apiUrl}/users/usergames/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();

        return await result?.games;
    };

    const getUserGameStats = async (id: string) => {
        if (id === "0") return {};
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
        if (!userData?.country) return "https://restcountries.eu/data/usa.svg";
        const data = await (
            await fetch(
                `https://restcountries.eu/rest/v2/alpha/${userData?.country}`,
                {
                    method: "GET"
                }
            )
        ).json();

        return data?.flag || "https://restcountries.eu/data/usa.svg";
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
        setUserExists(userData.status != 404);

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
        return locatione.pathname.split("/")[
            locatione.pathname.split("/").length - 1
        ];
    };

    const setDescription = async () => {
        if (descriptionEditorValue.length > 250) {
            submitMessageRef.current.innerHTML =
                "The description can't be longer than 250 characters.";
            return;
        }
        await fetch(`${apiUrl}/users/updatedescription`, {
            method: "PATCH",
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
        if (!(dataobject instanceof Array)) {
            return [];
        } else {
            const data = dataobject.map(value => {
                const date = new Date(Math.floor(parseInt(value.date)));
                return {
                    date: `${date.getDate()}/${date.getMonth() +
                        1}/${date.getFullYear()}`,
                    wpm: value.wpm,
                    uncorrectedwpm: value.rawwpm,
                    accuracy: value.accuracy,
                    difficulty: value.difficulty,
                    textid: value.textid
                };
            });

            return data;
        }
    };

    const generateListOfAchievements = async () => {
        const achievements = await (
            await fetch(`${apiUrl}/achievements`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();
        const sortedAchievements = achievements.sort((a, b) =>
            a.difficulty < b.difficulty
                ? -1
                : a.difficulty === b.difficulty
                ? 0
                : 1
        );

        const listOfAchievements = sortedAchievements.map((value, index) => {
            return (
                <ListItem
                    key={index + value.name}
                    style={{
                        border: "none",
                        borderLeft: `30px solid ${
                            sortedAchievements.some(
                                (r, index) =>
                                    userData.achievements[index] === value.id
                            )
                                ? theme.tertiary
                                : theme.secondary
                        }`,
                        margin: "5px auto"
                    }}
                >
                    <InsideAchievementListItem>
                        {value.name} - {value.description} Difficulty:{" "}
                        {value.difficulty}
                    </InsideAchievementListItem>
                </ListItem>
            );
        });
        return listOfAchievements;
    };

    const generateListOfScores = async (data: Array<UserGame>) => {
        const formattedData = convertUserGamesData(data);

        const returnedData = formattedData
            .slice(0)
            .reverse()
            .map((value, index) => {
                return (
                    <ListItem key={value.wpm + index.toString()}>
                        WPM: {Math.floor(value.wpm * 100) / 100}
                        {"   "}
                        CPM: {Math.floor(value.wpm * 5 * 100) / 100}
                        {"   "}
                        Accuracy: {Math.floor(value.accuracy * 100) / 100}
                        {"   "}
                        Difficulty: {value.difficulty}
                        {"   "}
                        Text Id: {value.textid}
                        {"   "}
                        Date: {value.date}
                    </ListItem>
                );
            });

        return returnedData;
    };

    //  if no flag exists then use :flag_white:
    return (
        <Wrapper>
            <InsideWrapper>
                <ChangePassword hidden={changePassword}></ChangePassword>
                <ProfileName>
                    <FlagNameGroup>
                        <FlagImage src={countryFlagUrl}></FlagImage>
                        <Name>{userData?.name}</Name>
                    </FlagNameGroup>

                    <GeneralStatistics>
                        <UnderName>
                            {userData?.role?.charAt(0)?.toUpperCase() +
                                userData?.role?.slice(1)}{" "}
                            Level: {level}
                        </UnderName>

                        <Statistics>
                            Best Score: {bestScore} Average WPM:{" "}
                            {Math.floor(gameGeneralStats.averageWpm * 100) /
                                100}{" "}
                            Average Accuracy:{" "}
                            {Math.floor(
                                gameGeneralStats.averageAccuracy * 100
                            ) / 100}{" "}
                            Total Tests Taken: {userData?.totaltests || 0}{" "}
                            Tutorials Completed:{" "}
                            {userData?.tutorials?.length || 0}
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
                        hidden={!isThisTheLoggedUser}
                        onClick={async () => {
                            if (!changeFlagEditor) {
                                setchangeFlagEditor(true);
                            } else {
                                await (
                                    await fetch(
                                        `${apiUrl}/users/updateCountry`,
                                        {
                                            method: "PATCH",
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
                        hidden={!isThisTheLoggedUser}
                        onClick={async () => {
                            setChangePassword(!changePassword);
                        }}
                    >
                        Change Password
                    </LogoutSwitchButton>
                    <LogoutSwitchButton
                        hidden={
                            userData?.role != "unverified" ||
                            verificationIsSent ||
                            !isThisTheLoggedUser
                        }
                        onClick={async () => {
                            await fetch(
                                `${apiUrl}/email/sendVerificationEmail/${userId}`,
                                {
                                    method: "GET",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }
                            );
                            setVerificationIsSent(true);
                        }}
                    >
                        Resend Verification
                    </LogoutSwitchButton>
                    <LogoutSwitchButton
                        hidden={!isThisTheLoggedUser}
                        onClick={() => {
                            switchTheme();
                        }}
                    >
                        Switch Theme
                    </LogoutSwitchButton>
                    <LogoutSwitchButton
                        hidden={!isThisTheLoggedUser}
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
                                            userData?.description === null
                                                ? ""
                                                : userData?.description
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
                                setEditDescription(true && isThisTheLoggedUser);
                            }}
                        >
                            {userData?.description === null
                                ? "There seems to be no description set."
                                : userData?.description}
                            <ClickMe hidden={!isThisTheLoggedUser}>
                                Click me!
                            </ClickMe>
                        </div>
                    )}
                </Description>
                <ChartsWrapper>
                    <NoGameData hidden={Boolean(userData?.totaltests)}>
                        {userExists
                            ? "Looks like there is no game data."
                            : "404 user doesn't exist."}
                    </NoGameData>
                    <ChartAndTitleWrapper hidden={!userData?.totaltests}>
                        <ChartName>Last {userGames?.length} Games</ChartName>
                        <GamesChart
                            dataProp={convertUserGamesData(userGames)}
                        ></GamesChart>
                        <ListItemWrapper>{elementsListOfGames}</ListItemWrapper>
                    </ChartAndTitleWrapper>
                    <ChartAndTitleWrapper hidden={!userData?.totaltests}>
                        <ChartName>All Personal Bests</ChartName>
                        <GamesChart
                            dataProp={convertUserGamesData(userPbs)}
                        ></GamesChart>
                        <ListItemWrapper>{elementsListOfPBS}</ListItemWrapper>
                    </ChartAndTitleWrapper>
                </ChartsWrapper>
                <AchievementsTitle>Achievements</AchievementsTitle>
                {listOfAchievements}
            </InsideWrapper>
        </Wrapper>
    );
};
