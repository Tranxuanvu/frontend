import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import ErrorNotify from '@/components/Notification/ErrorNotify';
import SuccessNotify from '@/components/Notification/SuccessNotify';
import { clearAllErrors } from '@/actions/errorActions';
import { clearSuccessMessages } from '@/actions/successActions';

import '@/styles/index.scss';

class Dashboard extends Component {
  handleClearSuccessMessage = () => {
    const { dispatchclearSuccessMessages } = this.props;
    dispatchclearSuccessMessages();
  }

  handleClearErrors = () => {
    const { dispatchClearAllErrors } = this.props;
    dispatchClearAllErrors();
  }

  render() {
    const { baseErrors, successMessages, children } = this.props;

    return (
      <div>
        <ErrorNotify
          errors={baseErrors}
          clearAllErrors={this.handleClearErrors}
        />
        <SuccessNotify
          messages={successMessages}
          clearMessages={this.handleClearSuccessMessage}
        />
        <Sidebar>
          {children}
        </Sidebar>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  dispatchClearAllErrors: PropTypes.func,
  dispatchclearSuccessMessages: PropTypes.func,
  baseErrors: PropTypes.arrayOf(PropTypes.string),
  successMessages: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ error, success }) => ({
  baseErrors: error.base,
  successMessages: success.messages,
});

export default connect(mapStateToProps, {
  dispatchClearAllErrors: clearAllErrors,
  dispatchclearSuccessMessages: clearSuccessMessages,
})(Dashboard);
