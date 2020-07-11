import React from "react";

import { apiUrl } from "../../utils/constants";

import { Wrapper, InsideWrapper } from "./style";

export const ProfilePage = () => {
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
                        const updateCountry = await (
                            await fetch(`${apiUrl}/users/updateCountry`, {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ country: "Ly" })
                            })
                        ).text();

                        console.log(updateCountry);
                    }}
                >
                    UpdateCountry to Ro
                </button>
            </InsideWrapper>
        </Wrapper>
    );
};
