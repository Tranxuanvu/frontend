import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'technology',
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
    technologiesFetched(
      state,
      { payload: { items, totalItems, page } }
    ) {
      state.page = page;
      state.items = items;
      state.totalItems = totalItems;
    },
  },
});

export const {
  setLoading,
  technologiesFetched,
} = slice.actions;

export default slice.reducer;
