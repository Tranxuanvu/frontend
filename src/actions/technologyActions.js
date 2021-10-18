import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import { setErrors } from '@/actions/errorActions';
import { setSuccessMessages } from '@/actions/successActions';
import {
  setLoading,
  technologiesFetched
} from '@/store/technology';
import AppConfig from '@/constants/AppConfig';


export const fetchTechnologies = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(AppConfig.API.TECHNOLOGIES, { params: { page } })
    .then(
      ({ data: response }) => {
        if (response.success) {
          const {
            result: { data },
            pagy: { totalItems, currentPage },
          } = camelcaseKeys(response, { deep: true });
          const items = data.map(item => ({ id: item.id, ...item.attributes }));

          dispatch(
            technologiesFetched({
              items,
              totalItems,
              page: currentPage,
            }),
          );
        } else {
          dispatch(setErrors('base', [response.message]));
        }
      },
    )
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const createTechnology = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post(`${AppConfig.API.TECHNOLOGIES}`, data)
    .then(({ data: response }) => {
      const { success, message } = response;

      if (success) {
        dispatch(setSuccessMessages([message]));
      } else {
        dispatch(setErrors('createTechnology', [message]));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrors('createTechnology', ['Submitted data is invalid']));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const updateTechnology = (id, data) => async (dispatch) => api
  .put(`${AppConfig.API.TECHNOLOGIES}/${id}`, data)
  .then(({ data: response }) => {
    const { success, message } = response;

    if (success) {
      dispatch(setSuccessMessages([message]));
    } else {
      dispatch(setErrors('updateTechnology', [message]));
    }
  })
  .catch((error) => {
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(setErrors('updateTechnology', ['Submitted data is invalid']));
    }
    throw error;
  })
  .finally(() => {
    dispatch(setLoading(false));
  });

export const deleteTechnology = (id) => async (dispatch) => api
  .delete(`${AppConfig.API.TECHNOLOGIES}/${id}`)
  .then(({ data: response }) => {
    const { success, message } = response;

    if (success) {
      dispatch(setSuccessMessages([message]));
    } else {
      dispatch(setErrors('base', [message]),);
    }
  })
  .catch((error) => {
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(
        setErrors('base', ['Deleting is unable to process']),
      );
    }
    throw error;
  })
  .finally(() => {
    dispatch(setLoading(false));
  });
