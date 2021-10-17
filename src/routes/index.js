import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppConfig from '@/constants/AppConfig';
import DashboardLayout from '@/containers/Layouts/Dashboard';

import PrivateRoute from '@/routes/PrivateRoute';
import HomeContainer from '@/containers/HomeContainer';
import LoginContainer from '@/containers/LoginContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';
import ProjectsContainer from '@/containers/ProjectsContainer';
import DevelopersContainer from '@/containers/DevelopersContainer';
import DashboardContainer from '@/containers/DashboardContainer';
import TechnologiesContainer from '@/containers/TechnologiesContainer';

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
      <DashboardLayout>
        <PrivateRoute
          path={`${AppConfig.ROUTES.DASHBOARD}`}
          component={DashboardContainer}
        />
        <PrivateRoute
          path={`${AppConfig.ROUTES.PROJECTS}`}
          component={ProjectsContainer}
        />
        <PrivateRoute
          path={`${AppConfig.ROUTES.TECHNOLOGIES}`}
          component={TechnologiesContainer}
        />
        <PrivateRoute
          path={`${AppConfig.ROUTES.DEVELOPERS}`}
          component={DevelopersContainer}
        />
      </DashboardLayout>

      <Route
        path='*'
        component={NotFoundContainer}
      />
    </Switch>
  );
}
export default Routes;
