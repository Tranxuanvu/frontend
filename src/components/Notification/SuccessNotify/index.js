import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';

const SuccessNotify = ({ messages, clearMessages }) => {
  if (!messages || !messages.length) {
    return null;
  }

  return (
    <>
      {notification.success({
        description: `${messages.join('</br>')}`,
        onClose: clearMessages,
      })}
    </>
  );
};

SuccessNotify.propTypes = {
  clearMessages: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default SuccessNotify;
