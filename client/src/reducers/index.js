import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ledgerReducer from './ledgerReducer';
import entryReducer from './entryReducer';

export default combineReducers({
  auth: authReducer,
  ledgers: ledgerReducer,
  entry: entryReducer
});
