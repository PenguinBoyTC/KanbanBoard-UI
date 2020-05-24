import React from 'react';
import '../styles/App.css';
import ProcessBoard from "./ProcessBoard";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ProcessBoard />
            </div>
        );
    }
}

export default App;
