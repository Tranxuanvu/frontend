import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => {

  console.log('render Main');

  return (
    <div>
      {children}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
