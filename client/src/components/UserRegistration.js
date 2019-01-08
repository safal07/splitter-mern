import React, {Component} from 'react';
import axios from 'axios';
class UserRegistration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      passwordVerify: "",
      email: "",
      errors: []
    }
  }

  handleNameChange = (e) => {
   this.setState({ name: e.target.value });
  }

  handleUsernameChange = (e) => {
   this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
   this.setState({ password: e.target.value });
  }

  handlePasswordVerifyChange = (e) => {
   this.setState({ passwordVerify: e.target.value });
  }

  handleEmailChange = (e) => {
   this.setState({ email: e.target.value });
  }


  register = (e) => {
    var self = this;
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/users/register', {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      passwordVerify: this.state.passwordVerify,
      email: this.state.email
    })
    .then(function (response) {
      // console.log(response.data);
      if(response.status === 422) {
        self.setState({error: response.error});
      }

    })
    .catch(function (error) {
      if(error.response.status === 422) {
          self.setState({errors: error.response.data.errors});
      }
      console.log(error.toString());
    });
  }

  render() {
    const renderedErrors = this.state.errors.map((error, i) => {
      return <li key = {i}> {error.msg} </li>
    });
    return(
      <div className = "UserRegistration">
          <ul className = "error"> {renderedErrors} </ul>
          <form onSubmit={this.register}>
              <div className="two-input">
                <div className="one">
                  <label> Your Name: </label>
                  <input type="text" name="name" id="name" onChange = {this.handleNameChange} required>
                  </input>
                </div>
                <div className="two">
                  <label> User Name: </label>
                  <input type="text" name="username" id="username" onChange = {this.handleUsernameChange} required>
                  </input>
                </div>
              </div>

              <div className="two-input">
                <div className="one">
                  <label> Password: </label>
                  <input type="password" name="password" id="password" onChange = {this.handlePasswordChange} required>
                  </input>
                </div>
                <div className="two">
                  <label> Verify Password: </label>
                  <input type="password" name="passwordVerify" id="passwordVerify" onChange = {this.handlePasswordVerifyChange} required>
                  </input>
                </div>
              </div>

              <div className="one-input">
                <label id="email-label">Email Address: </label>
                <input type="email" name="email" onChange = {this.handleEmailChange} required>
                </input>
              </div>
              <button type="submit" className="submit" name="submit">Submit</button>
          </form>
      </div>

    );
  };
}

export default UserRegistration;
