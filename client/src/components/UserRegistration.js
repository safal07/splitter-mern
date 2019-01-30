import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {register} from '../actions/authActions';
import {renderError} from '../utilities/renderError';

export function mapStateToProps(state) {
  return({
    auth: state.auth,
    errors: state.errors
  });
}

export function mapDispatchToProps(dispatch) {
  return({
    registerUser: (user) => {
      dispatch(register(user));
    }
  });
}

class UserRegistration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordVerify: "",
    }
  }


  handleFirstNameChange = (e) => {
   this.setState({ firstname: e.target.value });
  }

  handleLastNameChange = (e) => {
   this.setState({ lastname: e.target.value });
  }

  handleEmailChange = (e) => {
   this.setState({ email: e.target.value });
  }


  handlePasswordChange = (e) => {
   this.setState({ password: e.target.value });
  }

  handlePasswordVerifyChange = (e) => {
   this.setState({ passwordVerify: e.target.value });
  }

  register = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state);
  }

  render() {
    const registrationErrors = renderError(this.props.auth.registrationErrors);

    if(!this.props.auth.authenticated) {
      return(
        <div className = "UserRegistration">
            <ul className = "error"> {registrationErrors} </ul>
            <form onSubmit={this.register}>
                <div className="two-input">
                  <div className="one">
                    <label> First Name: </label>
                    <input type="text" name="firstname" id="firstname" onChange = {this.handleFirstNameChange} required>
                    </input>
                  </div>
                  <div className="two">
                    <label> Last Name: </label>
                    <input type="text" name="lastname" id="lastname" onChange = {this.handleLastNameChange} required>
                    </input>
                  </div>
                </div>

                <div className="one-input">
                  <label id="email-label">Email Address: </label>
                  <input type="email" name="email" onChange = {this.handleEmailChange} required>
                  </input>
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

                <button type="submit" className="submit" name="submit">Submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
