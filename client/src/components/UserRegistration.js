import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {register} from '../actions/authActions';
import {renderError} from '../utilities/renderError';

export function mapStateToProps(state) {
  return({
    auth: state.auth
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

  componentDidMount() {
    if(this.props.lid) {
      this.setState({
        lid: this.props.lid
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  register = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state);
  }

  render() {
    const registrationErrors = renderError(this.props.auth.registrationErrors);
      return(
        <div className = "registration-content">
            <p className = "title"> Get started for free! </p>
            <ul className = {this.props.auth.registrationErrors.length > 0 ? "error-show" : "error-hide"}> <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{registrationErrors} </ul>
            <form className = "registrationForm" onSubmit={this.register}>
                <div className="two-input">
                  <div className="one">
                    <label> First Name: </label>
                    <input type="text" name="firstname" id="firstname" onChange = {this.handleChange} required>
                    </input>
                  </div>
                  <div className="two">
                    <label> Last Name: </label>
                    <input type="text" name="lastname" id="lastname" onChange = {this.handleChange} required>
                    </input>
                  </div>
                </div>

                <div className="one-input">
                  <label id="email-label">Email Address: </label>
                  <input type="email" name="email" onChange = {this.handleChange} required>
                  </input>
                </div>

                <div className="two-input">
                  <div className="one">
                    <label> Password: </label>
                    <input type="password" name="password" id="password" onChange = {this.handleChange} required>
                    </input>
                  </div>
                  <div className="two">
                    <label> Verify Password: </label>
                    <input type="password" name="passwordVerify" id="passwordVerify" onChange = {this.handleChange} required>
                    </input>
                  </div>
                </div>
                <p className = "aggrement"> By registering, you are agreeing to comply with the
                terms and policies of SPLITTER </p>
                <button type="submit" className="register" name="submit">Register</button>
            </form>
        </div>
      );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
