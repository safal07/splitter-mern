import {LEDGER_REDIRECT, DELETE_LEDGER, OPEN_LEDGER, FETCH_LEDGERS} from '../actions/types';


export default function ledgerReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_LEDGERS:
      return Object.assign({}, state, {userLedgers: action.ledgers});
    case OPEN_LEDGER:
      localStorage.setItem('currentLedger', JSON.stringify(action.ledger));
      return Object.assign({}, state, {currentLedger: action.ledger});
    case LEDGER_REDIRECT:
      localStorage.setItem('currentLedger', null);
      return Object.assign({}, state, {currentLedger:  null});
    case DELETE_LEDGER:
      return Object.assign({}, state,
        {  userLedgers:  [...state.userLedgers.slice(0, action.ledger.key),
                         ...state.userLedgers.slice(action.ledger.key + 1, state.userLedgers.length)]});
    default:
      return state;
  }
}
