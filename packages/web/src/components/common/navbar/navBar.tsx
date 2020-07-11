import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Ul, Li, Fix, LoginLi } from "./style";

import { apiUrl } from "../../../utils/constants";

// Navbar component

export const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);

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
        setIsLogged(response);
    };

    useEffect(() => {
        isLoggedFunc();
    }, []);

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
                            console.log(isLogged);
                            isLoggedFunc();
                        }}
                        to={isLogged ? "/profile" : "/loginregister/login"}
                    >
                        {isLogged ? "Profile" : "Login"}
                    </Link>
                </LoginLi>
            </Ul>
        </Fix>
    );
};
