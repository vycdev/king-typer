import React, { useRef } from "react";

import { Wrapper, NavBar, OpenButton, CloseButton, Category } from "./style";
import { Link } from "react-router-dom";

export const Nav = () => {
    const navRef = useRef(null);

    const closeNav = () => {
        navRef.current.style.width = "0px";
    };
    const openNav = () => {
        navRef.current.style.width = "200px";
    };
    return (
        <Wrapper>
            <OpenButton
                onClick={() => {
                    openNav();
                }}
            >
                &#9776;
            </OpenButton>
            <NavBar ref={navRef}>
                <CloseButton
                    onClick={() => {
                        closeNav();
                    }}
                >
                    &times;
                </CloseButton>
                <Category>Practice Mode</Category>
                <Link
                    to={`/type/practice/easy`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Easy
                </Link>
                <Link
                    to={`/type/practice/normal`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Normal
                </Link>
                <Link
                    to={`/type/practice/tutorials`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Tutorials
                </Link>
                <Category>Multiplayer Mode</Category>
                <Link
                    to={`/type/multiplayer/easy`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Easy
                </Link>
                <Link
                    to={`/type/multiplayer/normal`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Normal
                </Link>
                <Link
                    to={`/type/multiplayer/Custom`}
                    onClick={() => {
                        closeNav();
                    }}
                >
                    Custom
                </Link>
            </NavBar>
        </Wrapper>
    );
};
