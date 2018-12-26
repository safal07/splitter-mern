import React, { Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
class Dashboard extends Component{

  constructor(props) {
    super(props);
    let authObj = JSON.parse(localStorage.getItem('clientAuth'));
    this.state = {
      loggedin:  authObj == null ? false : authObj.isAuthenticated,
      error: ""
    }

  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/apis/test')
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }


  logout = () => {
    this.props.clientAuthAPI.logout();
    this.setState({loggedin: false});
  }

  render() {
    if (this.state.loggedin) {
      return(
        <div className = "Dashboard wrapper">
            Loading....
            <button onClick = {this.logout}> Logout </button>
        </div>
      );
    }
    else{
      return(<Redirect to={{
            pathname: '/',
        }}
      />);
    }
  };
}

export default Dashboard;
