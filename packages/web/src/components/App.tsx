import * as React from "react"

interface AppInterface {
    text: string
}

const App = (props: AppInterface) => {
    return (
        <>
            <div>
                <h1>just some text</h1>
                <p>{props.text}</p>
            </div>
        </>
    )
}

export default App
