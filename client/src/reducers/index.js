import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ledgerReducer from './ledgerReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ledgers: ledgerReducer
});
