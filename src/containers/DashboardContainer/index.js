import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { logout } from '@/actions/authActions';
import { getCurrentUser } from '@/selectors/authSelectors';
import logoImage from '@/assets/images/logo.svg';
import './index.scss';

const { Title } = Typography;

class DashboardContainer extends Component {
  handleLogout = () => {
    const { dispatchLogout } = this.props;
    dispatchLogout();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="dashboard-container">
        <img src={logoImage} alt="logo" className="dahboard-container__logo" />
        <Title level={1} className="dahboard-container__title">
          Dashboard
        </Title>
        <div className="home-container__links">
          {currentUser && (
            <>
              <Button onClick={this.handleLogout}>Logout</Button>
            </>
          )}
          {!currentUser && (
            <Button type="primary">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  currentUser: PropTypes.object,
  dispatchLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, {
  dispatchLogout: logout,
})(DashboardContainer);
