export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid,
        token: action.token,
        userPhoto: action.userPhoto,
        displayName: action.displayName
      };
    case 'LOGOUT':
      return {};
    case 'IMAGE_UPLOAD':
      return {
        ...state,
        userMainImage: action.url
      };
    default:
      return state;
  }
};

export var usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return [
        ...action.users
      ];
    default:
      return state;
  }
}

export var userVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER_VOTE':
      return {
        ...state,
        url: action.url,
        id: action.id,
        name: action.name
      }
    default:
      return state;
  }
}
