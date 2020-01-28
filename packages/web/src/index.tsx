import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "./components/App"
import { Box } from "./components/typingBox/typingBox"

import styled from "@emotion/styled"

const Apps = styled.div`
    background-color: blue;
`

const Anotherone = styled("div")`
    background-color: yellow;
`

const Apppp = () => {
    return (
        <>
            <div>
                <Apps>
                    <App text="blue"></App>
                </Apps>
                <Anotherone>
                    <App text="Ye dude imagine that being yellow"></App>
                </Anotherone>
                <Box content="just testing"></Box>
            </div>
        </>
    )
}

ReactDOM.render(<Apppp />, document.getElementById("root"))
