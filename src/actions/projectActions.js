import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { setErrors, clearErrors } from '@/actions/errorActions';
import { setSuccessMessages } from '@/actions/successActions';
import {
  setLoading,
  projectsFetched
} from '@/store/project';
import AppConfig from '@/constants/AppConfig';


export const fetchProjects = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(AppConfig.API.PROJECTS, { params: { page } })
    .then(
      ({ data: response }) => {
        if (response.success) {
          const {
            result: { data },
            pagy: { totalItems, currentPage },
          } = camelcaseKeys(response, { deep: true });
          const items = data.map(item => ({ id: item.id, ...item.attributes }));

          dispatch(
            projectsFetched({
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

export const createProject = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post(`${AppConfig.API.PROJECTS}`, snakecaseKeys(data))
    .then(({ data: response }) => {
      const { success, message } = response;

      if (success) {
        dispatch(clearErrors('createProject'));
        dispatch(setSuccessMessages([message]));
      } else {
        dispatch(setErrors('createProject', [message]));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrors('createProject', ['Submitted data is invalid']));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const updateProject = (id, data) => async (dispatch) => api
  .put(`${AppConfig.API.PROJECTS}/${id}`, snakecaseKeys(data))
  .then(({ data: response }) => {
    const { success, message } = response;

    if (success) {
      dispatch(clearErrors('updateProject'));
      dispatch(setSuccessMessages([message]));
    } else {
      dispatch(setErrors('updateProject', [message]));
    }
  })
  .catch((error) => {
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(setErrors('updateProject', ['Submitted data is invalid']));
    }
    throw error;
  })
  .finally(() => {
    dispatch(setLoading(false));
  });

export const deleteProject = (id) => async (dispatch) => api
  .delete(`${AppConfig.API.PROJECTS}/${id}`)
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
