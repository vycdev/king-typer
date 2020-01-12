import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "./components/App"

import styled from "@emotion/styled"

const Apps = styled.div`
    background-color: blue;
`

const Anotherone = styled("div")`
    background-color: yellow;
`

class Apppp extends React.Component {
    render() {
        return (
            <div>
                <Apps>
                    <App color="blue"></App>
                </Apps>
                <Anotherone>
                    <App color="Ye dude imagine that being yellow"></App>
                </Anotherone>
            </div>
        )
    }
}

ReactDOM.render(<Apppp />, document.getElementById("root"))
