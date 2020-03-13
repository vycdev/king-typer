import * as React from "react";

import { Link } from "react-router-dom";

import { Ul, Li } from "./style";

export const Navbar = () => {
    return (
        <Ul>
            <Li>
                <Link to="/">Home</Link>
            </Li>
            <Li>
                <Link to="/type">Start Typing</Link>
            </Li>
        </Ul>
    );
};
