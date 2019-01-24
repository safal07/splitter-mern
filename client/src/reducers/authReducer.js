import {LOGIN, LOGOUT} from '../actions/types';


export default function authReducer(state = {}, action) {
  switch(action.type) {
    case LOGIN:
      localStorage.setItem('splitterUser', JSON.stringify(action.user));
      return Object.assign({}, state, {authenticated: true, loggedinUser: action.user});
    case LOGOUT:
      localStorage.setItem('splitterUser', JSON.stringify(null));
      return Object.assign({}, state, {authenticated: false, loggedinUser: null});
    default:
      return state;
  }
}
