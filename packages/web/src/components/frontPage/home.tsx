import * as React from "react";

import { Pannel1 } from "./components/pannel1/pannel1";
import { Pannel2 } from "./components/pannel2/pannel2";
import { Pannel3 } from "./components/pannel3/pannel3";

export const Home = () => {
    return (
        <>
            <Pannel1></Pannel1>
            <Pannel2></Pannel2>
            <Pannel3></Pannel3>
        </>
    );
};
