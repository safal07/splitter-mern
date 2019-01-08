import React, { Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
axios.defaults.withCredentials = true;

class UserLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedin:  this.props.loggedin,
      username: "",
      password: "",
      error: ""
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loggedin: nextProps.loggedin });
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
        console.log(response.data);
        self.props.login(response.data);
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
      console.log("Userlogin is sending to dashboard: this is storage right now");
      console.log(localStorage);
      return(<Redirect to={{
            pathname: '/dashboard',
        }}
      />);

    }

  };
}

export default UserLogin;
