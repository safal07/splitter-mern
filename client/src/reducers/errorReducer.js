import {REGERROR, LOGINERROR} from '../actions/types';


export default function errorReducer(state = {}, action) {
  switch(action.type) {
    case REGERROR:
      return Object.assign({}, state, {registrationErrors:  action.errors});
    case LOGINERROR:
      return Object.assign({}, state, {loginErrors:  action.errors});
    default:
      return state;
  }
}
