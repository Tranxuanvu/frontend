import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '@/routes/PrivateRoute';
import HomeContainer from '@/containers/HomeContainer';
import LoginContainer from '@/containers/LoginContainer';
import ProfileContainer from '@/containers/ProfileContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';

function Routes() {
  return (
    <Switch>
      <Route
        path='/login'
        component={LoginContainer}
      />
      <Route
        exact
        path='/'
        component={HomeContainer}
      />
      <PrivateRoute
        path='/me'
        component={ProfileContainer}
      />
      <Route
        path='*'
        component={NotFoundContainer}
      />
    </Switch>
  );
}
export default Routes;
