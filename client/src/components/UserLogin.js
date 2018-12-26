import React, { Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router'
// axios.defaults.baseURL = 'http://127.0.0.1:5000';

class UserLogin extends Component{
  constructor(props) {
    super(props);
    let authObj = JSON.parse(localStorage.getItem('clientAuth'));
    this.state = {
      loggedin:  authObj == null ? false : authObj.isAuthenticated,
      error: ""
    }

  }

  handleUsernameChange = (e) => {
   this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
   this.setState({ password: e.target.value });
  }



  login = (e) => {
    var self = this;
    e.preventDefault();
    if(!localStorage.getItem(this.state.username)) {
      axios.post('http://127.0.0.1:5000/users/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        self.props.clientAuthAPI.authenticate(response.data);
        self.setState({ loggedin : true});
      })
      .catch(function (error) {
        self.setState({error: "That didn't work, try again"});
        console.log(error.toString());
      });
    }

    else {
      this.setState({ error: "This user is already logged in" });
    }
  }


  render() {
    if(!this.state.loggedin) {
      return(
        <div className = "UserLogin">
            <p className = "error"> {this.state.error} </p>
            <form onSubmit = {this.login}>
                <div className="two-input">
                  <div className="one">
                    <label > Username: </label>
                    <input type="text" onChange={this.handleUsernameChange} name="username" id="username" placeholder="Sam Simmons" required>
                    </input>
                  </div>
                  <div className="two">
                    <label > Password: </label>
                    <input type="password" onChange={this.handlePasswordChange} name="password" id="password" required>
                    </input>
                  </div>
                </div>

                <button type="submit" className="submit" name="login">Login</button>
            </form>
        </div>

      );
    }
    else {
      return(<Redirect to={{
            pathname: '/dashboard',
        }}
      />);

    }

  };
}

export default UserLogin;
