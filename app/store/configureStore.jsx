import * as redux from 'redux';
import thunk from 'redux-thunk';

import {authReducer, usersReducer, userVoteReducer} from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    auth: authReducer,
    users: usersReducer,
    userVote: userVoteReducer
  });


  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
