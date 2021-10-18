import { set, clear, reset } from '@/store/error';

export const setErrors = (scope, errors) => async (dispatch) => {
  dispatch(set({ scope, errors }));
};

export const clearErrors = (scope) => async (dispatch) => {
  dispatch(clear({ scope }));
};

export const clearAllErrors = () => async (dispatch) => {
  dispatch(reset());
};
