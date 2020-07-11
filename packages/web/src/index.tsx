import React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Switch, Route } from "react-router-dom";

import { Home } from "./components/frontPage/home";
import { Navbar } from "./components/common/navbar/navBar";
import { Footer } from "./components/common/footer/footer";
import { StatisticsPage } from "./components/statisticsPage/statisticsPage";
import { StartTypingPage } from "./components/startTypingPage/startTypingPage";

import { LoginRegisterPage } from "./components/loginPage/loginPage";
import { ProfilePage } from "./components/profilePage/profilePage";

import { Global } from "@emotion/core";
import { globalStyle, Container, Content } from "./style";

// Create the SPA component.
const App = () => {
    return (
        <>
            <Container>
                <Global styles={globalStyle} />
                <Content>
                    <HashRouter>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                                <Footer></Footer>
                            </Route>
                            <Route path="/type">
                                <StartTypingPage></StartTypingPage>
                            </Route>
                            <Route exact path="/stats">
                                <StatisticsPage />
                            </Route>
                            <Route exact path="/profile">
                                <ProfilePage />
                            </Route>
                            <Route path="/loginregister">
                                <LoginRegisterPage />
                            </Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Container>
        </>
    );
};

// Render the app.
ReactDOM.render(<App />, document.getElementById("root"));
