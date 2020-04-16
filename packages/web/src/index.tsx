import React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./components/frontPage/home";
import { Navbar } from "./components/common/navbar/navBar";
import { Footer } from "./components/common/footer/footer";

import { Global } from "@emotion/core";
import { globalStyle, Container, Content } from "./style";
import { TypingBox } from "./components/common/typingBox/typingBox";

const App = () => {
    return (
        <>
            <Container>
                <Global styles={globalStyle} />
                <Content>
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/type">
                                <TypingBox
                                    mode="easy"
                                    colorCodes={{
                                        wrong: "#f54242",
                                        correct: "#4290f5",
                                        notTyped: "black"
                                    }}
                                ></TypingBox>
                            </Route>
                        </Switch>
                    </Router>
                </Content>
                <Footer></Footer>
            </Container>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
