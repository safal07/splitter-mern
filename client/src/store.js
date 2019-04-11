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
<<<<<<< HEAD
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
=======
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
>>>>>>> e1f0d28c6944f7858e764a76d56f38851fb698a7
  )
);

export default store;
