import React from 'react';
import '../styles/App.css';
import Main from './Main';
import TopBar from './TopBar'
import { TOKEN_KEY } from '../constants';

class App extends React.Component {

    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({ isLoggedIn: true });
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false });
    }
    render() {
        return (
            <div className="App">
                <TopBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
