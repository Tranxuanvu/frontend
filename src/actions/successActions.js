import { set } from '@/store/success';

export const setSuccessMessages = (messages) => async (dispatch) => {
  dispatch(set({ messages }));
};

export const clearSuccessMessages = () => async (dispatch) => {
  dispatch(set({ messages: [] }));
};
