import {FETCH_ENTRIES} from '../actions/types';


export default function entryReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_ENTRIES:
      return Object.assign({}, state, {
        userEntries: action.entriesData.entries,
        memberList: action.entriesData.members,
        entrySum: action.entriesData.entries.reduce((acc, curr) => acc + curr.amountofExpense, 0)});
    default:
      return state;
  }
}
