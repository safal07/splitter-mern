import {LOGIN, LOGOUT, LOGIN_ERROR, REG_ERROR} from '../actions/types';


export default function authReducer(state = {}, action) {
  switch(action.type) {
    case LOGIN:
      localStorage.setItem('splitterUser', JSON.stringify(action.user));
      return Object.assign({}, state, {authenticated: true, loggedinUser: action.user, loginErrors: [], registrationErrors: []});
    case LOGOUT:
      localStorage.setItem('splitterUser', JSON.stringify(null));
      return Object.assign({}, state, {authenticated: false, loggedinUser: null});
    case LOGIN_ERROR:
      return Object.assign({}, state, {loginErrors: action.errors});
    case REG_ERROR:
      return Object.assign({}, state, {registrationErrors: action.errors});
    default:
      return state;
  }
}
