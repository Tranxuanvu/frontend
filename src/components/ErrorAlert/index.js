import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import './index.scss';

function ErrorAlert({ errors }) {
  if (!errors || !errors.length) {
    return null;
  }

  return (
    <div className="error-alert-container">
      <Alert
        description={
          <>
            {errors.map((error) => (
              <Fragment key={error}>
                {error}
                <br />
              </Fragment>
            ))}
          </>
        }
        message="Messages"
        type="error"
        showIcon
      />
    </div>
  );
}

ErrorAlert.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorAlert;
