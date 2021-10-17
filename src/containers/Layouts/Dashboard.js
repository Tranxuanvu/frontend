import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '@/components/Sidebar';

import '@/styles/index.scss';


const Dashboard = ({ children }) => {

    console.log('render Main');

    return (
        <div>
            <Sidebar>
              {children}
            </Sidebar>
        </div>
    );
};

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
