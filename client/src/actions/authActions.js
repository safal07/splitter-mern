import {LOGIN, LOGOUT, REG_ERROR, LOGIN_ERROR, SHOW_NOTIFICATION} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;


export function register(user) {
  let errors = [];
  return((dispatch) => {
    axios.post('/userApis/register', user)
    .then(function (response) {
      console.log(response.data);
      dispatch({
        type: LOGIN,
        user: response.data
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
      else
        dispatch({
          type: SHOW_NOTIFICATION,
          message: "The action could not be completed.",
          notificationType: "error"
        });
    });
  });
}


export function login(email, password) {
  let errors = [];
  return((dispatch) => {
    axios.post('/userApis/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      dispatch({
        type: LOGIN,
        user: response.data
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
      dispatch({
          type: SHOW_NOTIFICATION,
          message: "The action could not be completed.",
          notificationType: "error"
        });
    });
  });
}




export function logout() {
  return((dispatch) => {
    axios.post('/userApis/logout', {})
    .then(function (response) {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
          type: SHOW_NOTIFICATION,
          message: "Sucessfully logged out",
          notificationType: "sucess"
        });
    })
    .catch(function (error) {
      dispatch({
          type: SHOW_NOTIFICATION,
          message: "The action could not be completed.",
          notificationType: "error"
        });
    });
  });
}
