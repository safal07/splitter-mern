import {LEDGER_ERROR, DELETE_LEDGER, OPEN_LEDGER, FETCH_LEDGERS} from '../actions/types';


export default function ledgerReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_LEDGERS:
      return Object.assign({}, state, {userLedgers: action.ledgers, ledgerErrors: []});
    case OPEN_LEDGER:
      localStorage.setItem('currentLedger', JSON.stringify(action.ledger));
      return Object.assign({}, state, {currentLedger: action.ledger});
    case DELETE_LEDGER:
      localStorage.setItem('currentLedger', null);
      return Object.assign({}, state,
        {currentLedger:  null,
          userLedgers:  [...state.userLedgers.slice(0, action.ledger.key),
                         ...state.userLedgers.slice(action.ledger.key + 1, state.userLedgers.length)]});
     case LEDGER_ERROR:
       return Object.assign({}, state, {ledgerErrors:  action.errors});
    default:
      return state;
  }
}
