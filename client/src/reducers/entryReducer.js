import { ENTRY_ERROR, SHOW_ENTRYFORM, HIDE_ENTRYFORM, ADD_ENTRY, FETCH_ENTRIES} from '../actions/types';


export default function entryReducer(state = {}, action) {
  switch(action.type) {
    case SHOW_ENTRYFORM:
      return Object.assign({}, state, {entryFormShowing:  true});
    case HIDE_ENTRYFORM:
      return Object.assign({}, state, {entryFormShowing:  false});
    case FETCH_ENTRIES:
      return Object.assign({}, state, {userEntries:  action.entries, entryFormShowing: false, entryErrors: []});
    case ADD_ENTRY:
      return Object.assign({}, state, {userEntries: [...state.userEntries, action.newEntry], entryFormShowing: false, entryErrors: []});
    case ENTRY_ERROR:
      return Object.assign({}, state, {entryErrors: action.errors});
    default:
      return state;
  }
}
