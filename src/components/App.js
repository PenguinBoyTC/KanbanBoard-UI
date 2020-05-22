import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import ProcessBoard from "./ProcessBoard";
import AddCardForm from "./AddCardForm";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ProcessBoard />
                {/*<AddCardForm/>*/}
            </div>
        );
    }
}

export default App;
