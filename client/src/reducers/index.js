import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ledgerReducer from './ledgerReducer';
import entryReducer from './entryReducer';
import utilReducer from './utilReducer';
export default combineReducers({
  auth: authReducer,
  ledgers: ledgerReducer,
  entry: entryReducer,
  util: utilReducer
});
