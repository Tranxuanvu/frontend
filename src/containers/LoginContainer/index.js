import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';

import ErrorMessage from '@/components/ErrorAlert';
import { login } from '@/actions/authActions';
import './index.scss';

const { Title } = Typography;

class LoginContainer extends Component {
  handleLogin = (values) => {
    const { dispatchLogin } = this.props;
    dispatchLogin(values);
  };

  render() {
    const { loading, errors, currentUser } = this.props;

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-container">
        <Title level={2} className="login-container__title">
          Login
        </Title>
        <ErrorMessage errors={errors} />
        <Form
          name="login-form"
          layout="vertical"
          onFinish={this.handleLogin}
          colon={false}
          hideRequiredMark
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Email is not valid' },
              { required: true, message: 'Email is required' },
            ]}
            hasFeedback
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  dispatchLogin: PropTypes.func,
};

const mapStateToProps = ({ auth, error }) => ({
    currentUser: auth.currentUser,
    loading: auth.loading,
    errors: error.login,
  });

export default connect(mapStateToProps, {
  dispatchLogin: login,
})(LoginContainer);
