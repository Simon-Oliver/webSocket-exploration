import { setUser } from '../actions';

const initialState = {
  userName: '',
  id: '',
  isAuth: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { userName, id, isAuth } = action.payload;
      return { userName, id, isAuth };
    default:
      return state;
  }
};

export default userReducer;
