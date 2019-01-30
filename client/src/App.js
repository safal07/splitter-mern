import React, { Component } from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import Test from './components/Test';
import Dashboard from './components/Dashboard';
import Ledger from './components/Ledger';
import store from './store';
import {Provider} from 'react-redux';


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
      localStorage.setItem('splitterUser', null);

    if(!localStorage.getItem('currentLedger'))
      localStorage.setItem('currentLedger', null);
  }

  render() {
    return (
      <Provider store = {store}>
          <Switch>
              <Route exact path = '/' component={Home} />
              <Route path='/login' component={UserLogin} />
              <Route exact path = '/register' component={UserRegistration} />
              <Route exact path = '/test' component={Test} />
              <Route path="/ledger" component={Ledger} />
              <Route path="/dashboard" component={Dashboard} />

            </Switch>
      </Provider>
    );
  }
}

export default App;
