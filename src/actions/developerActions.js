import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { setErrors, clearErrors } from '@/actions/errorActions';
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

          dispatch(clearErrors('base'));
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
    .then(() => {
      dispatch(clearErrors('createDeveloper'));
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

export const updateDeveloper = (id, data) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .put(`${AppConfig.API.DEVELOPERS}/${id}`, snakecaseKeys(data))
    .then(() => {
      dispatch(clearErrors('updateDeveloper'));
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
};

export const deleteDeveloper = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .delete(`${AppConfig.API.DEVELOPERS}/${id}`)
    .then(() => {
      dispatch(clearErrors('base'));
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
