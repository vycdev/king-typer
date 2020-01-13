import * as React from "react"

interface PageInterface {
    color: string
}

class App extends React.Component<PageInterface, {}> {
    render() {
        return (
            <div>
                <h1>Welcome to KING TYPER MFS</h1>
                <p>THIS IS: {this.props.color}</p>
            </div>
        )
    }
}

export default App
