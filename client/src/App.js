import React, { Component } from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {Redirect} from 'react-router';
class App extends Component {

  componentDidMount(){
    if(!localStorage.getItem('clientAuth'))
      localStorage.setItem('clientAuth', JSON.stringify(clientAuth));
  }

  render() {
    return (
      <Switch>
        <Route exact path = '/' component={Home} />
        <Route
          path='/login'
          render={(props) => <UserLogin {...props} clientAuthAPI={clientAuthAPI} />}
        />
        <Route exact path = '/register' component={UserRegistration} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

// <Route exact path = '/' component={Home} />
// <Route exact path = '/login' component={UserLogin} />
// <Route exact path = '/register' component={UserRegistration} />

const clientAuth = {
  isAuthenticated: false,
  currentUser: ""
}

const clientAuthAPI = {
  authenticate(user) {
    let authObj = JSON.parse(localStorage.getItem('clientAuth'));
    authObj.currentUser = user.username;
    authObj.isAuthenticated = true;
    localStorage.setItem('clientAuth', JSON.stringify(authObj));
  },
  logout() {
    let authObj = JSON.parse(localStorage.getItem('clientAuth'));
    authObj.currentUser = "";
    authObj.isAuthenticated = false;
    localStorage.setItem('clientAuth', JSON.stringify(authObj));
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    JSON.parse(localStorage.getItem('clientAuth')).isAuthenticated === true
      ? <Component {...props} clientAuthAPI = {clientAuthAPI}/>
      : <Redirect to='/' />
  )} />
)

export default App;
