import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import { setErrors, clearErrors } from '@/actions/errorActions';
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

          dispatch(clearErrors('base'));
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
    .then(() => {
      dispatch(clearErrors('createTechnology'));
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

export const updateTechnology = (id, data) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .put(`${AppConfig.API.TECHNOLOGIES}/${id}`, data)
    .then(() => {
      dispatch(clearErrors('updateTechnology'));
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
};

export const deleteTechnology = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .delete(`${AppConfig.API.TECHNOLOGIES}/${id}`)
    .then(({ data: response }) => {

      if (response.success) {
        dispatch(clearErrors('base'));
      } else {
        dispatch(
          setErrors('base', [response.message]),
        );
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
};
