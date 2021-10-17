import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import { throwErrors } from '@/actions/errorActions';
import { loginRequest, loginSuccess, loginFail, loggedOut } from '@/store/auth';
import {
  setUserToLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/authUtils';

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const { data } = await api.post('api/v1/auths/sign_in', {
      email, password,
    });

    const { success } = data;

    if (success) {
      const { result: user } = camelcaseKeys(data, { deep: true });

      setUserToLocalStorage(user);
      dispatch(loginSuccess({ user }));
    } else {
      dispatch(loginFail());
      dispatch(throwErrors(['Something went wrong!']));
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
