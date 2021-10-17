import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  PageHeader,
} from 'antd';

const HeaderSection = ({ title, ...rest }) => (
  <div>
    <PageHeader
      className="site-page-header"
      {...rest}
      title={title}
    />
    <Divider />
  </div>
);

HeaderSection.propTypes = {
  title: PropTypes.string,
};

export default HeaderSection;
