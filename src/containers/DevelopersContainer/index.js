import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import HeaderSection from '@/components/HeaderSection';
import {
  updateDeveloper,
  createDeveloper,
  deleteDeveloper,
  fetchDevelopers,
} from '@/actions/developerActions';
import {
  fetchProjects
} from '@/actions/projectActions';
import DevelopersList from './components/List';
import DeveloperForm from './DeveloperForm';

class DevelopersContainer extends Component {
  static initialFormState = {
    formType: null,
    formObject: null,
    formErrors: null,
    formVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      optionsProject: [],
      ...this.constructor.initialFormState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    switch (state.formType) {
      case 'create':
        return {
          formErrors: props.createErrors,
          optionsProject: props.projectItems.map(({ id, name }) => ({ label: name, value: id })),
        };
      case 'update':
        return {
          formErrors: props.updateErrors,
          optionsProject: props.projectItems.map(({ id, name }) => ({ label: name, value: id })),
        };
      default:
        return {
          formErrors: null,
        };
    }
  }

  componentDidMount() {
    const { fetchDevelopers, fetchProjects, page } = this.props;
    fetchDevelopers({ page });
    fetchProjects({ page: 1 });
  }

  handleRefreshDevelopers() {
    const {
      baseErrors,
      createErrors,
      updateErrors,
      fetchDevelopers,
    } = this.props;

    const hasError =
      (!!baseErrors && baseErrors.length > 0) ||
      (!!createErrors && createErrors.length > 0) ||
      (!!updateErrors && updateErrors.length > 0);

    if (!hasError) {
      fetchDevelopers({ page: 1 });
    }
  }

  handleOkForm = ({ id, ...submittedData }) => {
    const { formType } = this.state;

    const { createDeveloper, updateDeveloper } = this.props;

    if (formType === 'create') {
      createDeveloper(submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshDevelopers();
      });
    }

    if (formType === 'update') {
      updateDeveloper(id, submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshDevelopers();
      });
    }
  };

  handleCancleForm = () => {
    this.setState({ ...this.constructor.initialFormState });
  };

  handleClickAddNewDeveloper = () => {
    this.setState({
      formVisible: true,
      formType: 'create',
      formObject: {
        firtName: null,
        lastName: null,
        projectIds: [],
      },
    });
  };

  handleClickEditDeveloper = (developer) => {
    this.setState({
      formVisible: true,
      formType: 'update',
      formObject: {
        id: developer.id,
        lastName: developer.lastName,
        firstName: developer.firstName,
        projectIds: developer.projects.map(project => `${project.id}`),
      },
    });
  };

  handleClickDeleteDeveloper = ({ id }) => {
    const { deleteDeveloper } = this.props;

    deleteDeveloper(id).then(() => {
      this.handleRefreshDevelopers();
    });
  };

  render() {
    const {
      items,
      loading,
      baseErrors,
    } = this.props;

    const {
      formType,
      formErrors,
      formObject,
      formVisible,
      optionsProject,
    } = this.state;

    return (
      <div className="devlopers-container">
        <HeaderSection
          title="Developers"
          extra={[
            <Button
              type='primary'
              key='newDeveloper'
              onClick={this.handleClickAddNewDeveloper}
            >
              Add New Developer
            </Button>,
          ]}
        />

        <DevelopersList
          items={items}
          loading={loading}
          onClickEdit={this.handleClickEditDeveloper}
          onClickDelete={this.handleClickDeleteDeveloper}
        />

        <DeveloperForm
          destroyOnClose
          formType={formType}
          maskClosable={false}
          visible={formVisible}
          formErrors={formErrors}
          formObject={formObject}
          confirmLoading={loading}
          onOk={this.handleOkForm}
          onCancel={this.handleCancleForm}
          optionsProject={optionsProject}
        />
      </div>
    );
  }
}

DevelopersContainer.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  loading: PropTypes.bool,
  fetchProjects: PropTypes.func,
  projectItems: PropTypes.array,
  updateDeveloper: PropTypes.func,
  createDeveloper: PropTypes.func,
  deleteDeveloper: PropTypes.func,
  fetchDevelopers: PropTypes.func,
  baseErrors: PropTypes.arrayOf(PropTypes.string),
  createErrors: PropTypes.arrayOf(PropTypes.string),
  updateErrors: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ developer, project, error }) => ({
  page: developer.page,
  baseErrors: error.base,
  items: developer.items,
  loading: developer.loading,
  projectItems: project.items,
  totalItems: developer.totalItems,
  createErrors: error.createDeveloper,
  updateErrors: error.updateDeveloper,
});

export default connect(mapStateToProps, {
  fetchProjects,
  updateDeveloper,
  createDeveloper,
  deleteDeveloper,
  fetchDevelopers,
})(DevelopersContainer);
