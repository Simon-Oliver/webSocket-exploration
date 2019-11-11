import { setUser } from '../actions';

const initialState = {
  userName: '',
  userID: '',
  isAuth: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { userName, userID, isAuth } = action.payload;
      return { userName, userID, isAuth };
    default:
      return state;
  }
};

export default userReducer;
