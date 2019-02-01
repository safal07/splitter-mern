import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions/authActions'
import {renderError} from '../utilities/renderError';

function mapStateToProps(state) {
  return({
    auth: state.auth,
    errors: state.errors
  });
}

function mapDispatchToProps(dispatch) {
  return({
    loginUser: (email, password) => {
      dispatch(login(email, password));
    }
  });
}


class UserLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  handleEmailChange = (e) => {
   this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
   this.setState({ password: e.target.value });
  }



  login = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  }


  render() {
    let loginErrors = renderError(this.props.auth.loginErrors);
    if(!this.props.auth.authenticated) {
      return(
        <div className = "UserLogin">
            <form onSubmit = {this.login}>
                <ul className = "error"> {loginErrors} </ul>
                <div className="two-input">
                  <div className="one">
                    <label > Email: </label>
                    <input type="email" onChange={this.handleEmailChange} name="email" id="email" required>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
