import * as React from "react";

import { Link } from "react-router-dom";

import { Ul, Li, Fix } from "./style";

export const Navbar = () => {
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
            </Ul>
        </Fix>
    );
};
