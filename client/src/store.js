import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const localStorageUser = JSON.parse(localStorage.getItem('splitterUser'));
const currentLedger = JSON.parse(localStorage.getItem('currentLedger'));

const initialState = {
  auth: {
    authenticated: localStorageUser === null ? false : true,
    loggedinUser: localStorageUser === null ? null : localStorageUser,
    registrationErrors: [],
    loginErrors: [],
  },
  ledgers: {
    userLedgers: [],
    currentLedger : currentLedger === null ? null : currentLedger
  },
  entry: {
    userEntries: [],
    memberList: [],
    entrySum: 0
  },
  util: {
    isLoading: false,
    notificationShowing: false,
  }

};


const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),

    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  )
);

export default store;
