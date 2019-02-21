import { SHOW_NOTIFICATION, SHOW_LOADER, HIDE_LOADER, LEDGER_REDIRECT, ADD_MEMBER, DELETE_LEDGER, OPEN_LEDGER, FETCH_LEDGERS, ADD_LEDGER, LEDGER_ERROR} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function fetchLedgers() {
  let errors = [];
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
      errors.push("Something went wrong, please try again")
      dispatch({
        type: LEDGER_ERROR,
        errors
      })
    });
  });
}


export function addLedger(ledger) {
  let errors = [];
  return((dispatch) => {
    axios.post('http://localhost:5000/ledgerApis/ledgers', ledger)
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "New ledger sucessfully added."
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
      }
      else
        errors.push("Something went wrong, please try again")

      dispatch({
        type: LEDGER_ERROR,
        errors
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
  let errors = [];
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
        message: "Ledger sucessfully deleted."
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
      }
      else
        errors.push("Something went wrong, please try again")

      dispatch({
        type: LEDGER_ERROR,
        errors
      });
    });
  });
}

export function addMember(member) {
  return((dispatch) => {
    axios.post('http://localhost:5000/ledgerApis/addMember', member).
    then((response) => {
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "New member sucessfully added."
      });
    }).
    catch((err) => {
      console.log(err);
    });
  });
}
