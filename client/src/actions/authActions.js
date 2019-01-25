import {LOGIN, LOGOUT, REG_ERROR, LOGIN_ERROR,
        CLEAR_LOGIN_ERROR, CLEAR_REG_ERROR} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;


export function register(user) {
  let errors = [];
  return((dispatch) => {
    axios.post('http://localhost:5000/users/register', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      passwordVerify: user.passwordVerify
    })
    .then(function (response) {
      console.log(response.data);
      dispatch({
        type: LOGIN,
        user: response.data
      });
      dispatch({
        type: CLEAR_REG_ERROR
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
        dispatch({
          type: REG_ERROR,
          errors
        });
      }
      else{
        errors.push("Something went wrong, please try again")
        dispatch({
          type: REG_ERROR,
          errors
        });
      }
    });
  });
}


export function login(email, password) {
  let errors = [];
  return((dispatch) => {
    axios.post('http://localhost:5000/users/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      dispatch({
        type: LOGIN,
        user: response.data
      });
      dispatch({
        type: CLEAR_LOGIN_ERROR
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 401) {
        errors.push("Email or Password did not match");
        dispatch({
          type: LOGIN_ERROR,
          errors
        });
      }
      else{
        errors.push("Something went wrong, please try again")
        dispatch({
          type: LOGIN_ERROR,
          errors
        });
      }
    });
  });
}


export function logout() {
  return((dispatch) => {
    axios.post('http://localhost:5000/users/logout', {})
    .then(function (response) {
      console.log(response.data);
      dispatch({
        type: LOGOUT,
      });
    })
    .catch(function (error) {
      console.log(error.toString());
    });
  });
}
