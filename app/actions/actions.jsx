import firebase, {firebaseRef, facebookProvider} from 'app/firebase/index'

export var setAnimal = (animal) => {
  return {
    type: 'SET_ANIMAL',
    animal
  };
};

export var login = (uid, token, userPhoto, displayName) => {
  return {
    type: 'LOGIN',
    uid,
    token,
    userPhoto,
    displayName
  }
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(facebookProvider).then((result) => {
      var token = result.credential.accessToken;
      dispatch(login(result.user.uid, token, result.user.photoURL, result.user.displayName));
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

export var populateFriendsList = () => {
  return (dispatch, getState) => {
    const {auth} = getState();
    const authToken = auth.token;
    console.log(auth);
  }
};
