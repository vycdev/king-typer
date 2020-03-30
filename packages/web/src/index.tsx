import React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./frontPage/home";
import { Navbar } from "./components/navbar/navBar";

import { Global } from "@emotion/core";
import { globalStyle } from "./style";
import { Box } from "./components/typingBox/typingBox";

const App = () => {
    return (
        <>
            <Global styles={globalStyle} />
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/type">
                        <Box></Box>
                    </Route>
                </Switch>
            </Router>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
