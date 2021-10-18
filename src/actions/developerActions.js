import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { setErrors } from '@/actions/errorActions';
import { setSuccessMessages } from '@/actions/successActions';
import {
  setLoading,
  developersFetched
} from '@/store/developer';
import AppConfig from '@/constants/AppConfig';


export const fetchDevelopers = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(AppConfig.API.DEVELOPERS, { params: { page } })
    .then(
      ({ data: response }) => {
        if (response.success) {
          const {
            result: { data },
            pagy: { totalItems, currentPage },
          } = camelcaseKeys(response, { deep: true });
          const items = data.map(item => ({ id: item.id, ...item.attributes }));

          dispatch(
            developersFetched({
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

export const createDeveloper = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post(`${AppConfig.API.DEVELOPERS}`, snakecaseKeys(data))
    .then(({ data: response }) => {
      const { success, message } = response;

      if (success) {
        dispatch(setSuccessMessages([message]));
      } else {
        dispatch(setErrors('createDeveloper', [message]));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrors('createDeveloper', ['Submitted data is invalid']));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const updateDeveloper = (id, data) => async (dispatch) => api
  .put(`${AppConfig.API.DEVELOPERS}/${id}`, snakecaseKeys(data))
  .then(({ data: response }) => {
    const { success, message } = response;

    if (success) {
      dispatch(setSuccessMessages([message]));
    } else {
      dispatch(setErrors('updateDeveloper', [message]));
    }
  })
  .catch((error) => {
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(setErrors('updateDeveloper', ['Submitted data is invalid']));
    }
    throw error;
  })
  .finally(() => {
    dispatch(setLoading(false));
  });

export const deleteDeveloper = (id) => async (dispatch) => api
  .delete(`${AppConfig.API.DEVELOPERS}/${id}`)
  .then(({ data: response }) => {
    const { success, message } = response;

    if (success) {
      dispatch(setSuccessMessages([message]));
    } else {
      dispatch(setErrors('base', [message]));
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
