import $ from 'jquery'
import firebase, {firebaseRef} from 'app/firebase/index';

export var filterUsers = (users, uid) => {
  var img;
  var usersRef = firebaseRef.child(`users/${uid}/votes`);
  return usersRef.once('value').then((snapshot) => {
    var alreadyVotedUsers = snapshot.val() || {};
    var alreadyVotedArray = [];

    Object.keys(alreadyVotedUsers).forEach((userId) => {
      alreadyVotedArray.push(userId);
    });

    // console.log(alreadyVotedArray);
    // console.log(users);

    var finalBoss = [];

    users.forEach((user) => {
      if ($.inArray(user, alreadyVotedArray) === -1) {
        finalBoss.push(user);
      }
    });

    var id = finalBoss[0];
    var imgRef = firebaseRef.child(`users/${id}/img`);
    return imgRef.once('value').then((snapshot) => {
      var imgSrc = snapshot.val() || '';
      console.log('img src', imgSrc);
      var img = imgSrc;
      return img;
    });
  });
};
