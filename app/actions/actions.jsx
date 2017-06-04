import firebase, {firebaseRef, facebookProvider} from 'app/firebase/index'
import request from 'superagent';

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

// export var populateFriendsList = () => {
//   return (dispatch, getState) => {
//     const {auth} = getState();
//     const authToken = auth.token;
//     console.log(auth);
//   }
// };

export var imageUpload = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    url
  }
}

export var startImageUpload = (file) => {
  return (dispatch, getState) => {
    // const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
    // const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;
    const CLOUDINARY_UPLOAD_PRESET = 'b4ydmdnn';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dmkyqvixg/upload'

    let upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }

      if (response.body.secure_url !== '') {
        var uid = getState().auth.uid;
        var imageRef = firebaseRef.child(`users/${uid}/img`).set(response.body.secure_url);
        return imageRef.then(() => {
          dispatch(imageUpload(response.body.secure_url));
        });
        //save to firebase using getState() for user id (auth.uid) (const {auth} = getState()) (const uid = auth.uid)
      }
    })
  }
};

export var populateAuth = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    console.log(uid);
    var imageRef = firebaseRef.child(`users/${uid}/img`);

    return imageRef.once('value').then((snapshot) => {
      console.log(snapshot)
      var img = snapshot.val() || '';
      dispatch(imageUpload(img));
    });
  };
};
