import { setErrors } from '@/store/error';

export const throwErrors = (errors) => async (dispatch) => {
  dispatch(setErrors({ errors }));
};

export const clearErrors = () => async (dispatch) => {
  dispatch(setErrors({ errors: [] }));
};
