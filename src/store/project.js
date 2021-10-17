import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'project',
  initialState: {
    page: 1,
    items: [],
    totalItems: 0,
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    projectsFetched(state, { payload: { items, totalItems, page } }) {
      state.page = page;
      state.items = items;
      state.totalItems = totalItems;
    },
  },
});

export const {
  setLoading,
  projectsFetched,
} = slice.actions;

export default slice.reducer;
