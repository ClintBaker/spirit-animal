import firebase, {firebaseRef, facebookProvider} from 'app/firebase/index'
import request from 'superagent';
import $ from 'jquery';
import _ from 'lodash'

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
      var nameRef = firebaseRef.child(`users/${result.user.uid}/name`).set(result.user.displayName);
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
    var imageRef = firebaseRef.child(`users/${uid}/img`);

    return imageRef.once('value').then((snapshot) => {
      var img = snapshot.val() || '';
      dispatch(imageUpload(img));
    });
  };
};

export var addUsers = (users) => {
  return {
    type: 'ADD_USERS',
    users
  }
};

export var startAddUsers = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var usersRef = firebaseRef.child('users');

    return usersRef.once('value').then((snapshot) => {
      var users = snapshot.val() || {};
      var parsedUsers = [];

      Object.keys(users).forEach((userId) => {
        parsedUsers.push(userId);
      });

      dispatch(addUsers(parsedUsers));
    });
  }
};

export var addUserVote = (url, name, id) => {
  return {
    type: 'ADD_USER_VOTE',
    url,
    name,
    id
  }
};

export var addVoteName = (name) => {
  return {
    type: 'ADD_VOTE_NAME',
    name
  }
};

export var startUserVote = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var users = getState().users;


    var usersRef = firebaseRef.child(`users/${uid}/votes`);
    return usersRef.once('value').then((snapshot) => {
      var alreadyVotedUsers = snapshot.val() || {};
      var alreadyVotedArray = [];

      Object.keys(alreadyVotedUsers).forEach((userId) => {
        alreadyVotedArray.push(userId);
      });

      var finalBoss = [];

      users.forEach((user) => {
        if ($.inArray(user, alreadyVotedArray) === -1) {
          finalBoss.push(user);
        }
      });

      var id = finalBoss[0];
      var imgRef = firebaseRef.child(`users/${id}`);
      return imgRef.once('value').then((snapshot) => {
        var imgSrc = snapshot.val() || {};
        var key = snapshot.key;
        dispatch(addUserVote(imgSrc.img, imgSrc.name, key));
      });
    });
  };
};

export var startUpdateAnimal = (animal) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var receiverId = getState().userVote.id;

    var receiverRef = firebaseRef.child(`users/${receiverId}/animal/${animal}`).push({uid: uid});
    return receiverRef.then(() => {
      var userRef = firebaseRef.child(`users/${uid}/votes/${receiverId}`).push({animal: animal});
      return userRef.then(() => {
        dispatch(startAddUsers());
        dispatch(startUserVote());
      });
    });
  };
};

export var myStats = (animals, votes) => {
  return {
    type: 'MY_STATS',
    animals,
    votes
  }
};

export var startMyStats = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;

    var animalRef = firebaseRef.child(`users/${uid}/animal`);
    return animalRef.once('value').then((snapshot) => {
      var animalObj = snapshot.val() || {};
      var myAnimals = [];

      var animalArray = Object.keys(animalObj).forEach((animal) => {
        myAnimals.push(animal);
      });

      // console.log(myAnimals);
      var votesArray = [];

      var arr = myAnimals.forEach((animal) => {
        return animalRef.child(animal).once('value').then((snapshot) => {
          var anVotesObj = snapshot.val() || {};
          var totalVotes = Object.keys(anVotesObj).length;
          // console.log(totalVotes);
          votesArray.push(totalVotes);
        }).then(() => {
          // console.log(votesArray);
          // console.log(myAnimals);
          dispatch(myStats(myAnimals, votesArray));
        });

        // console.log(myAnimals);
        // console.log(votesArray);
        // dispatch(myStats(myAnimals, votesArray));
      });

      // console.log('Votes Array', votesArray);
      // console.log(votesArray[0]);
      // console.log(votesArray[1]);

      // var customArr = ['Gorilla', 'Monster'];
    });
  };
};
