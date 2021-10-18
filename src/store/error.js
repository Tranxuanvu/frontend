import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'error',
  initialState: {},
  reducers: {
    set(state, { payload: { scope, errors } }) {
      state[scope] = errors;
    },
    clear(state, { payload: { scope } }) {
      if (Array.isArray(scope)) {
        scope.forEach((sp) => {
          state[sp] = null;
        });
      } else {
        state[scope] = null;
      }
    },
    reset: state => ({}),
  },
});

export const { set, clear, reset } = slice.actions;

export default slice.reducer;
