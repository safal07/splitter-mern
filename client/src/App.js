import React, { Component } from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin : localStorage.getItem('splitterUser') === "" ? false : true,
      currentUser: localStorage.getItem('splitterUser')
    }
  }

  componentDidMount(){
    if(!localStorage.getItem('splitterUser'))
      localStorage.setItem('splitterUser', "");
  }

  login = (username) => {
    this.setState({
      loggedin : true,
      currentUser : username
    });
    localStorage.setItem('splitterUser', username);
  }

  logout = () => {
    var self = this;
    axios.post('http://127.0.0.1:5000/users/logout', {})
    .then(res => {console.log(res)
      self.setState({
        loggedin : false,
        currentUser : ""
      });
      localStorage.setItem('splitterUser', "");
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Switch>
        <Route exact path = '/' component={Home} />
        <Route
          path='/login'
          render={(props) =>
            <UserLogin {...props}
            loggedin = {this.state.loggedin}
            currentUser = {this.state.currentUser}
            login = {this.login}
            />}
        />
        <Route exact path = '/register' component={UserRegistration} />
        <Route path="/dashboard" render={(props) =>
          <Dashboard {...props}
          loggedin = {this.state.loggedin}
          currentUser = {this.state.currentUser}
          logout = {this.logout}
          />} />
      </Switch>
    );
  }
}

// <Route exact path = '/' component={Home} />
// <Route exact path = '/login' component={UserLogin} />
// <Route exact path = '/register' component={UserRegistration} />

// const clientAuth = {
//   isAuthenticated: false,
//   currentUser: ""
// }
//
// const clientAuthAPI = {
//   authenticate(user) {
//     let authObj = JSON.parse(localStorage.getItem('clientAuth'));
//     authObj.currentUser = user.username;
//     authObj.isAuthenticated = true;
//     localStorage.setItem('clientAuth', JSON.stringify(authObj));
//   },
//   logout() {
//     let authObj = JSON.parse(localStorage.getItem('clientAuth'));
//     authObj.currentUser = "";
//     authObj.isAuthenticated = false;
//     localStorage.setItem('clientAuth', JSON.stringify(authObj));
//   }
// }

//
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     localStorage.getItem('splitterUser') != ""
//       ? <Component {...props}
//       />
//       : <Redirect to='/' />
//   )} />
// )

export default App;
