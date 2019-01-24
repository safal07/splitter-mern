import { FETCH_LEDGERS, ADD_LEDGER } from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function fetchLedgers() {
  return((dispatch) => {
    axios.get('http://localhost:5000/apis/ledgers')
    .then(function (response) {
      dispatch({
        type: FETCH_LEDGERS,
        ledgers: response.data
      });
    })
    .catch(function (error) {
      console.log(error.toString());
    });
  });
}


export function addLedger(ledger) {
  return((dispatch) => {
    axios.post('http://localhost:5000/apis/ledgers', ledger)
    .then(function (response) {
      dispatch({
        type: ADD_LEDGER,
        newLedger: response.data
      });
    })
    .catch(function (error) {
      console.log(error.toString());
    });
  });
}
