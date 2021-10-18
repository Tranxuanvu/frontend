import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';

const ErrorNotify = ({ errors, clearAllErrors }) => {
  if (!errors || !errors.length) {
    return null;
  }

  return (
    <>
      {notification.error({
        description: `${errors.join('</br>')}`,
        onClose: clearAllErrors,
      })}
    </>
  );
};

ErrorNotify.propTypes = {
  clearAllErrors: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorNotify;
