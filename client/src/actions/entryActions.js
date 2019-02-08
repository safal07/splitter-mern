import {DELETE_ENTRY, FETCH_ENTRIES,ADD_ENTRY, ENTRY_ERROR, SHOW_ENTRYFORM, HIDE_ENTRYFORM} from './types';
import axios from 'axios';
export function showEntryForm() {
  return({
    type: SHOW_ENTRYFORM
  });
}

export function hideEntryForm() {
  return({
    type: HIDE_ENTRYFORM
  });
}

export function fetchEntries(ledger_id) {
  return ((dispatch) => {
    axios.get('http://localhost:5000/entryApis/entries?ledgerid=' + ledger_id).
    then((response) => {
      dispatch({
        type: FETCH_ENTRIES,
        entryData: response.data
      });
    }).
    catch((err) => {
      console.log(err.response);
      // if(error.response && error.response.status === 422) {
      //   for (var i = 0; i < error.response.data.errors.length; i++) {
      //     errors.push(error.response.data.errors[i].msg);
      //   }
      // }
      // else
      //   errors.push("Something went wrong, please try again")
      //
      // dispatch({
      //   type: LEDGER_ERROR,
      //   errors
      // });
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
