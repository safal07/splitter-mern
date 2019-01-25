import { FETCH_LEDGERS, ADD_LEDGER, LEDGER_ERROR, CLEAR_LEDGER_ERROR} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function fetchLedgers() {
    console.log("state");
  let errors = [];
  return((dispatch) => {
    axios.get('http://localhost:5000/apis/ledgers')
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
      });
      dispatch({
        type: CLEAR_LEDGER_ERROR
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
      dispatch({
        type: CLEAR_LEDGER_ERROR
      });
    })
    .catch(function (error) {
      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
        dispatch({
          type: LEDGER_ERROR,
          errors
        })
      }
      else{
        errors.push("Something went wrong, please try again")
        dispatch({
          type: LEDGER_ERROR,
          errors
        })
      }
    });
  });
}
