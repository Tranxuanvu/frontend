/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { notification } from 'antd';

import { getCurrentUser } from '@/selectors/authSelectors';

function PrivateRoute({
  component: Component,
  currentUser,
  authorize,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        if (authorize && !authorize(currentUser)) {
          notification.error({
            message: 'Permission Denied',
            description: 'You are not authorized to perform this action',
          });
          return <Redirect to={{ pathname: '/' }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.object,
  currentUser: PropTypes.object,
  authorize: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(PrivateRoute);
