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
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
