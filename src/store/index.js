import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';
import project from './project';
import technology from './technology';
import developer from './developer';

const reducer = combineReducers({
  auth,
  error,
  project,
  developer,
  technology,
});

const store = configureStore({
  reducer,
});

export default store;
