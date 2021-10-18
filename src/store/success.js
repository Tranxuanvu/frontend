import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'success',
  initialState: {
    messages: [],
  },
  reducers: {
    set(state, { payload: { messages } }) {
      state.messages = messages;
    },
  },
});

export const { set } = slice.actions;

export default slice.reducer;
