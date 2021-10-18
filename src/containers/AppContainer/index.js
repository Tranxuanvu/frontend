import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import { clearAllErrors } from '@/actions/errorActions';
import Routes from '@/routes';

import '@/styles/index.scss';
import './index.scss';

class AppContainer extends Component {
  componentDidMount() {
    const { history, dispatchclearAllErrors } = this.props;

    this.unlistenHistory = history.listen(() => {
      dispatchclearAllErrors();
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  render() {
    return (
      <div className="app-container">
        <Routes />
      </div>
    );
  }
}

AppContainer.propTypes = {
  history: PropTypes.object,
  dispatchclearAllErrors: PropTypes.func,
};

export default withRouter(
  connect(null, {
    dispatchclearAllErrors: clearAllErrors,
  })(AppContainer),
);
