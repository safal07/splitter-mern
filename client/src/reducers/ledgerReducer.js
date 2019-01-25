import {FETCH_LEDGERS, ADD_LEDGER} from '../actions/types';


export default function ledgerReducer(state = [], action) {
  switch(action.type) {
    case FETCH_LEDGERS:
      return state.concat(action.ledgers);
    case ADD_LEDGER:
      return [...state, action.newLedger];
    default:
      return state;
  }
}
