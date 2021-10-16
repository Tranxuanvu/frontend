import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'error',
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors(state, { payload: { errors } }) {
      state.errors = errors;
    },
  },
});

export const { setErrors } = slice.actions;

export default slice.reducer;
