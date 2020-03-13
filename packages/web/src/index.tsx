import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./frontPage/home";
import { Navbar } from "./components/navbar/navBar";

const App = () => {
    useEffect(() => {
        document.body.style.margin = "0";
    });
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
