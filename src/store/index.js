import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import technology from './technology';

const reducer = combineReducers({
  auth,
  error,
  technology,
});

const store = configureStore({
  reducer,
});

export default store;
