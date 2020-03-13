import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./frontPage/home";

const App = () => {
    return (
        <>
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
