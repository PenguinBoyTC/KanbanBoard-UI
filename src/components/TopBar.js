import React from 'react';
import logo from '../assets/images/logo.svg';
import {LogoutOutlined} from '@ant-design/icons';

class TopBar extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Kanban Board</h1>
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <LogoutOutlined />
                        Logout
                    </a> : null}
            </header>
        );
    }
}
export default TopBar;