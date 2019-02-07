import { ADD_MEMBER, DELETE_LEDGER, OPEN_LEDGER, FETCH_LEDGERS, ADD_LEDGER, LEDGER_ERROR} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function fetchLedgers() {
  let errors = [];
  return((dispatch) => {
    axios.get('http://localhost:5000/apis/ledgers')
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
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
    axios.post('http://localhost:5000/apis/ledgers', ledger)
    .then(function (response) {
      dispatch({
        type: ADD_LEDGER,
        newLedger: response.data
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
    axios.delete('http://localhost:5000/apis/ledgers', { data: ledger })
    .then(function (response) {
      dispatch({
        type: DELETE_LEDGER,
        ledger
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
    axios.post('http://localhost:5000/apis/addMember', member).
    then((response) => {
      console.log(response);
    }).
    catch((err) => {
      console.log(err);
    });
  });
}
