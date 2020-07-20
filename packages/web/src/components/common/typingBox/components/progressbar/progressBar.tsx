import React, { useState, useEffect } from "react";

import {
    Wrapper,
    ProgressOutside,
    ProgressInside,
    PlaceProgressWrapper,
    NameFlag,
    FlagImage,
    LevelDisplay
} from "./style";

import { apiUrl } from "../../../../../utils/constants";

import { getTheme } from "../../../../../utils/getTheme";

const theme = getTheme();

interface PropsProgressBar {
    percentage: number;
    userid: number;
    place: number;
    multiplayer: boolean;
}

const array = [
    theme.background.secondary,
    theme.boxColorCodes.correct,
    theme.boxColorCodes.wrong,
    theme.primary,
    theme.secondary,
    theme.tertiary,
    theme.text.primary
];

const randomColor = () => array[Math.floor(Math.random() * array.length)];

export const ProgressBar = (props: PropsProgressBar) => {
    const [percentage, setPercentage] = useState(props.percentage);
    const [place, setPlace] = useState(props.place);
    const [color] = useState(randomColor());
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

    useEffect(() => {
        setPercentage(props.percentage);
        setPlace(props.place);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateUserData();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateCountryFlag();
    }, [props.percentage, props.place, props.userid, userData.country]);

    const updateUserData = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setUserData(await getUserData(props.userid.toString()));
    };

    const updateCountryFlag = async () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setCountryFlagUrl(await getCountryUrlFlag());
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

    return (
        <Wrapper>
            <NameFlag>
                <FlagImage src={countryFlagUrl}></FlagImage>
                {userData.name ? userData.name : "Guest"} ⭐
                <LevelDisplay>
                    {userData.exp
                        ? Math.floor(Math.sqrt(userData?.exp / 10) * 100) / 100
                        : 0}
                </LevelDisplay>
            </NameFlag>
            <PlaceProgressWrapper>
                <ProgressOutside color={color} multiplayer={props.multiplayer}>
                    <ProgressInside
                        progress={percentage}
                        color={color}
                    ></ProgressInside>
                </ProgressOutside>
                {props.multiplayer
                    ? place === 1
                        ? place + "st"
                        : place === 2
                        ? place + "nd"
                        : place === 3
                        ? place + "rd"
                        : place + "th"
                    : ""}
            </PlaceProgressWrapper>
        </Wrapper>
    );
};
