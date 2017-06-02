import firebase, {firebaseRef, facebookProvider} from 'app/firebase/index'

export var setAnimal = (animal) => {
  return {
    type: 'SET_ANIMAL',
    animal
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
};

//       var token = result.credential.accessToken;
//       var user = result.user;

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(facebookProvider).then((result) => {
      dispatch(login(result.user.uid));
      console.log(result);
    }, (e) => {
      console.log('can\'t auth', e);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('logged out');
      dispatch(logout());
    });
  };
};
