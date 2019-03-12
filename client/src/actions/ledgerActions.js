import {LOGOUT, SHOW_NOTIFICATION, SHOW_LOADER, HIDE_LOADER, LEDGER_REDIRECT, ADD_MEMBER, DELETE_LEDGER, OPEN_LEDGER, FETCH_LEDGERS, ADD_LEDGER} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function fetchLedgers() {
  return((dispatch) => {
    dispatch({
      type: SHOW_LOADER
    });
    axios.get('http://localhost:5000/ledgerApis/ledgers')
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
      });
      dispatch({
        type: HIDE_LOADER
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 401) {
        dispatch({
          type: LOGOUT
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


export function addLedger(ledger) {
  return((dispatch) => {
    axios.post('http://localhost:5000/ledgerApis/ledgers', ledger)
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "New ledger sucessfully added.",
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

export function openLedger(ledger) {
    return({
      type: OPEN_LEDGER,
      ledger
    });
}



export function deleteLedger(ledger) {
  return((dispatch) => {
    axios.delete('http://localhost:5000/ledgerApis/ledgers', { data: ledger })
    .then(function (response) {
      dispatch({
        type: DELETE_LEDGER,
        ledger
      });
      dispatch({
        type: LEDGER_REDIRECT,

      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "Ledger sucessfully deleted.",
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

export function addMember(member) {
  return((dispatch) => {
    axios.post('http://localhost:5000/ledgerApis/addMember', member).
    then((response) => {
      console.log(response);
      dispatch({
        type: SHOW_NOTIFICATION,
        message: response.data,
        notificationType: "sucess"
      });
    }).
    catch((err) => {
      let message = "The action could not be completed.";
      if(err.response && err.response.data.errors) {
        message = err.response.data.errors[0].msg;
      }
      dispatch({
          type: SHOW_NOTIFICATION,
          message: message,
          notificationType: "error"
        });
    });
  });
}
