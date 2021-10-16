import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Routes from '@/routes';
import { clearErrors } from '@/actions/errorActions';

import '@/styles/index.scss';
import './index.scss';

class AppContainer extends Component {
  componentDidMount() {
    const { history, dispatchClearErrors } = this.props;

    this.unlistenHistory = history.listen(() => {
      dispatchClearErrors();
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
  dispatchClearErrors: PropTypes.func,
};

export default withRouter(
  connect(null, {
    dispatchClearErrors: clearErrors,
  })(AppContainer),
);
