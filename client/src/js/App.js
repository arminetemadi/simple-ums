import React, { Component } from 'react'
import Navbar from './presentational/Navbar/Navbar'
import Content from './presentational/Content'

/**
 * main component,
 * works like the layout of the whole application.
 */
class App extends Component {
    render = () => {
        return (
            <div>
                {/* top menu */}
                <Navbar />

                {/* content of each page reside here */}
                <Content />
            </div>
        )
    }
}

export default App
