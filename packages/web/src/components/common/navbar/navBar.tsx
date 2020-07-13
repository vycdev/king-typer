import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Ul, Li, Fix, LoginLi } from "./style";

import { apiUrl } from "../../../utils/constants";

// Navbar component

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedin] = useState(false);

    const isLoggedFunc = async () => {
        const response = await (
            await fetch(`${apiUrl}/auth/isloggedin`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json();
        localStorage.setItem("userid", response.userid);
        setIsLoggedin(response.islogged);
    };

    const locatione = useLocation();

    useEffect(() => {
        isLoggedFunc();
    }, [locatione.pathname]);

    return (
        <Fix>
            <Ul>
                <Li>
                    <Link to="/">Home</Link>
                </Li>
                <Li>
                    <Link to="/type">Start Typing</Link>
                </Li>
                <Li>
                    <Link to="/stats">Statistics</Link>
                </Li>

                <LoginLi>
                    <Link
                        onClick={async () => {
                            isLoggedFunc();
                        }}
                        to={
                            isLoggedIn
                                ? `/profile/${localStorage.getItem("userid")}`
                                : "/loginregister/login"
                        }
                    >
                        {isLoggedIn ? "Profile" : "Login"}
                    </Link>
                </LoginLi>
            </Ul>
        </Fix>
    );
};
