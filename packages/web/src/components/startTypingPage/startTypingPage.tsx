import React from "react";

import { Wrapper, Latest } from "./style";

import { Nav } from "./components/navBar/navBar";
import { Route } from "react-router-dom";

import { TypingBox } from "../common/typingBox/typingBox";
import { getTheme } from "../../utils/getTheme";

import { Tutorials } from "./components/tutorials/tutorials";

const theme = getTheme();

export const StartTypingPage = () => {
    return (
        <Wrapper>
            <Nav />
            <Route exact path="/type">
                <Latest>HERE I WILL PUT THE LATEST HIGHSCORES</Latest>
            </Route>
            <Route exact path="/type/practice/easy">
                <TypingBox
                    mode="easy"
                    colorCodes={theme.boxColorCodes}
                    multiplayer={false}
                ></TypingBox>
            </Route>
            <Route exact path="/type/practice/normal">
                <TypingBox
                    mode="hard"
                    colorCodes={theme.boxColorCodes}
                    multiplayer={false}
                ></TypingBox>
            </Route>
            <Route exact path="/type/practice/tutorials">
                <Tutorials></Tutorials>
            </Route>
            <Route exact path="/type/practice/tutorial/:id">
                <TypingBox
                    mode="hard"
                    colorCodes={theme.boxColorCodes}
                    multiplayer={false}
                    tutorial={true}
                ></TypingBox>
            </Route>
            <Route exact path="/type/multiplayer/easy">
                <Latest>MULTIPLAYER EASY MODE</Latest>
            </Route>
            <Route exact path="/type/multiplayer/normal">
                <Latest>MULTIPLAYER NORMAL MODE</Latest>
            </Route>
        </Wrapper>
    );
};
