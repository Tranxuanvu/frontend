import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import {
  Menu,
  Layout,
} from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  PieChartOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import AppConfig from '@/constants/AppConfig';
import logoImage from '@/assets/images/logo.svg';

import './index.scss';

const { Content, Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super();

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { children } = this.props;

    return (
      <Layout
        className="sidebar-container"
        style={{ minHeight: '100vh' }}
      >
        <Sider
          width="270"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <Link to={`${AppConfig.ROUTES.HOME}`}>
              <img src={logoImage} alt="logo" />
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to={`${AppConfig.ROUTES.DASHBOARD}`}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="projects" icon={<ProjectOutlined />}>
              <Link to={`${AppConfig.ROUTES.PROJECTS}`}>Projects</Link>
            </Menu.Item>
            <Menu.Item key="technologies" icon={<PieChartOutlined />}>
              <Link to={`${AppConfig.ROUTES.TECHNOLOGIES}`}>Technologies</Link>
            </Menu.Item>
            <Menu.Item key="developers" icon={<UserOutlined />}>
              <Link to={`${AppConfig.ROUTES.DEVELOPERS}`}>Developers</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '16px' }}>
            <div className="site-layout-background">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
