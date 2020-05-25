import React from 'react';
import Register from "./Register";
import Login from './Login';
import ProcessBoard from './ProcessBoard';
import { Switch, Route, Redirect } from 'react-router-dom'

class Main extends React.Component {
    getHome = () => {
        return this.props.isLoggedIn ? <ProcessBoard/> : <Redirect to="/login" />;
    }

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin} />;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}
export default Main;