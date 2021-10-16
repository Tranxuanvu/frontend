import { configureStore, combineReducers } from '@reduxjs/toolkit';

import error from './error';
import auth from './auth';

const reducer = combineReducers({
  error,
  auth,
});

const store = configureStore({
  reducer,
});

export default store;
