import { ADD_ENTRY, FETCH_ENTRIES, DELETE_ENTRY} from '../actions/types';


export default function entryReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_ENTRIES:
      return Object.assign({}, state, {userEntries:  action.entryData.entries, entrySummary: action.entryData.summary});
    case ADD_ENTRY:
      return Object.assign({}, state, {userEntries: [action.newEntry, ...state.userEntries]});
    case DELETE_ENTRY:
      return Object.assign({}, state,
        {  userEntries:  [...state.userEntries.slice(0, action.entry.key),
                       ...state.userEntries.slice(action.entry.key + 1, state.userEntries.length)]});
    default:
      return state;
  }
}
