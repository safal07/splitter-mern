import React, { Component } from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {Redirect} from 'react-router';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path = '/' component={Home} />
        <Route exact path = '/login' component={UserLogin} />
        <Route exact path = '/register' component={UserRegistration} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }


}


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default App;
