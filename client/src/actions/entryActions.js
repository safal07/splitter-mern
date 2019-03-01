import {SHOW_NOTIFICATION, SHOW_LOADER, HIDE_LOADER, LEDGER_REDIRECT, DELETE_ENTRY, FETCH_ENTRIES,ADD_ENTRY} from './types';
import axios from 'axios';

export function fetchEntries(ledger_id) {
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
      dispatch({
          type: SHOW_NOTIFICATION,
          message: "The action could not be completed.",
          notificationType: "error"
        });
    });
  });
}

export function addEntry(entry) {
  return((dispatch) => {
    axios.post('http://localhost:5000/entryApis/entries', entry).
    then((response) => {
      dispatch({
        type: ADD_ENTRY,
        newEntry: response.data
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "Your entry was sucessfully added.",
        notificationType: "sucess"
      });
    }).
    catch((error) => {
      dispatch({
          type: SHOW_NOTIFICATION,
          message: "The action could not be completed.",
          notificationType: "error"
      });
    });
  });
}

export function deleteEntry(entry) {
  return((dispatch) => {
    axios.delete('http://localhost:5000/entryApis/entries', { data: entry })
    .then(function (response) {
      dispatch({
        type: DELETE_ENTRY,
        entry
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        message: "Yout entry was sucessfully deleted.",
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
