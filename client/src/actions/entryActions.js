import {SHOW_NOTIFICATION, SHOW_LOADER, HIDE_LOADER, LEDGER_REDIRECT, DELETE_ENTRY, FETCH_ENTRIES,ADD_ENTRY, ENTRY_ERROR} from './types';
import axios from 'axios';

export function fetchEntries(ledger_id) {
  let errors = [];
  return ((dispatch) => {
    dispatch({
      type: SHOW_LOADER
    });
    axios.get('http://localhost:5000/entryApis/entries?ledgerid=' + ledger_id).
    then((response) => {
      dispatch({
        type: FETCH_ENTRIES,
        entryData: response.data
      });
      dispatch({
        type: HIDE_LOADER
      });

    }).
    catch((err) => {

      if(err.response && err.response.status === 410) {
        dispatch({
          type: LEDGER_REDIRECT
        });
      }
      else
        errors.push("Something went wrong, please try again")

      dispatch({
        type: ENTRY_ERROR,
        errors
      });
    });
  });
}

export function addEntry(entry) {
  let errors = [];
  return((dispatch) => {
    axios.post('http://localhost:5000/entryApis/entries', entry).
    then((response) => {
      dispatch({
        type: ADD_ENTRY,
        newEntry: response.data
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "Your entry was sucessfully added."
      });
    }).
    catch((error) => {
      if(error.response && error.response.status === 422) {
        for (var i = 0; i < error.response.data.errors.length; i++) {
          errors.push(error.response.data.errors[i].msg);
        }
      }
      else
        errors.push("Something went wrong, please try again");
        dispatch({
          type: ENTRY_ERROR,
          errors
        });
    });
  });
}

export function deleteEntry(entry) {
  let errors = [];
  return((dispatch) => {
    axios.delete('http://localhost:5000/entryApis/entries', { data: entry })
    .then(function (response) {
      dispatch({
        type: DELETE_ENTRY,
        entry
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "Yout entry was sucessfully deleted."
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
        type: ENTRY_ERROR,
        errors
      });
    });
  });
}
