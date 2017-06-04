var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/index';
import router from 'app/router/index';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.populateAuth());
    store.dispatch(actions.startAddUsers());
    store.dispatch(actions.startMyStats());
    // store.dispatch(actions.login(user.uid, user.token));
    // store.dispatch(actions.storeToken(user.token));
    // store.dispatch(actions.populateUserInfo(user.photoURL, user.displayName));
    hashHistory.push('/spirit-animals');
    // store.dispatch(actions.populateFriendsList());
  } else {
    // store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});



// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
