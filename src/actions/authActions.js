// import api from '@/api';
import { throwErrors } from '@/actions/errorActions';
import { loginRequest, loginSuccess, loginFail, loggedOut } from '@/store/auth';
import {
  setUserToLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/authUtils';

const fakeUser = {
  name: 'Peter',
  email: 'me@example.com',
  password: 'password123',
  token: 'secretUserAuthToken',
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    // Simulate login request
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === fakeUser.email && password === fakeUser.password) {
      setUserToLocalStorage(fakeUser);
      dispatch(loginSuccess({ user: fakeUser }));
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch(loginFail());
    dispatch(throwErrors(['Email or password is invalid']));
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  removeUserFromLocalStorage();
  dispatch(loggedOut());
};
