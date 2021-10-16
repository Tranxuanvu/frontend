import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '@/utils/authUtils';

const initialUser = getUserFromLocalStorage();

const slice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    currentUser: initialUser,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, { payload: { user } }) {
      state.currentUser = user;
      state.loading = false;
    },
    loginFail(state) {
      state.currentUser = null;
      state.loading = false;
    },
    loggedOut(state) {
      state.currentUser = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loggedOut,
} = slice.actions;

export default slice.reducer;
