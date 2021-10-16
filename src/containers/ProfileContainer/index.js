import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Button, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

import { logout } from '@/actions/authActions';
import { getCurrentUser } from '@/selectors/authSelectors';
import './index.scss';

const { Text } = Typography;

class ProfileContainer extends Component {
  handleLogout = () => {
    const { dispatchLogout } = this.props;
    dispatchLogout();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className="profile-container">
        <Avatar
          size={80}
          icon={<AntDesignOutlined />}
          className="profile-container__avatar"
        />
        <Space direction="vertical" className="profile-container__detail">
          <Text>Name: {currentUser.name}</Text>
          <Text>Email: {currentUser.email}</Text>
        </Space>
        <Space className="profile-container__links">
          <Button type="primary">
            <Link to="/">Back to home</Link>
          </Button>
          <Button onClick={this.handleLogout}>Logout</Button>
        </Space>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  currentUser: PropTypes.object,
  dispatchLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, {
  dispatchLogout: logout,
})(ProfileContainer);
