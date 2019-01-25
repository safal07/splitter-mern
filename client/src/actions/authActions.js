import {LOGIN, LOGOUT, REGERROR, LOGINERROR } from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function register(user) {
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
      })
    })
    .catch(function (error) {
      let errors = [];

      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
        dispatch({
          type: REGERROR,
          errors
        })
      }
      else{
        errors.push("Something went wrong, please try again")
        dispatch({
          type: REGERROR,
          errors
        })
      }
    });
  });
}


export function login(email, password) {
  return((dispatch) => {
    axios.post('http://localhost:5000/users/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      dispatch({
        type: LOGIN,
        user: response.data
      })
    })
    .catch(function (error) {
      dispatch({
        type: LOGINERROR,
        errors: "Email or Password does not match"
      })
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
