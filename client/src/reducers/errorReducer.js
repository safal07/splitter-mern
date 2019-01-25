import {REG_ERROR, LOGIN_ERROR, LEDGER_ERROR, CLEAR_LOGIN_ERROR,
        CLEAR_REG_ERROR, CLEAR_LEDGER_ERROR} from '../actions/types';


export default function errorReducer(state = {}, action) {
  switch(action.type) {
    case REG_ERROR:
      return Object.assign({}, state, {registrationErrors:  action.errors});
    case LOGIN_ERROR:
      return Object.assign({}, state, {loginErrors:  action.errors});
    case LEDGER_ERROR:
      return Object.assign({}, state, {ledgerErrors:  action.errors});
    case CLEAR_REG_ERROR:
      return Object.assign({}, state, {registrationErrors:  []});
    case CLEAR_LOGIN_ERROR:
      return Object.assign({}, state, {loginErrors:  []});
    case CLEAR_LEDGER_ERROR:
      return Object.assign({}, state, {ledgerErrors:  []});
    default:
      return state;
  }
}
