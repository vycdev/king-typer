import * as React from "react";

import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
    );
};
