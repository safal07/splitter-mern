import {SHOW_NOTIFICATION, HIDE_NOTIFICATION, SHOW_LOADER, HIDE_LOADER} from '../actions/types';


export default function ledgerReducer(state = {}, action) {
  switch(action.type) {
    case SHOW_LOADER:
      return Object.assign({}, state, {isLoading: true});
    case HIDE_LOADER:
      return Object.assign({}, state, {isLoading: false});
    case SHOW_NOTIFICATION:
      return Object.assign({}, state, {notificationShowing: true,
                                    notificationMessage: action.message,
                                    notificationType: action.notificationType});
    case HIDE_NOTIFICATION:
      return Object.assign({}, state, {notificationShowing: false, notificationMessage: ""});
    default:
      return state;
  }
}
