export var animalReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_ANIMAL':
      return action.animal;
    default:
      return state;
  };
};

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
