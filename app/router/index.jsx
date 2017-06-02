import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import firebase from 'app/firebase/index'

import Landing from 'Landing';
import SpiritAnimal from './../components/SpiritAnimal';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};
var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/spirit-animals');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="spirit-animals" component={SpiritAnimal} onEnter={requireLogin} />
      <IndexRoute component={Landing} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
