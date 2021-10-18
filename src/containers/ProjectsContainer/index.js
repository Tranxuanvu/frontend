import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import HeaderSection from '@/components/HeaderSection';
import {
  updateProject,
  createProject,
  deleteProject,
  fetchProjects,
} from '@/actions/projectActions';
import {
  fetchTechnologies
} from '@/actions/technologyActions';
import {
  fetchDevelopers
} from '@/actions/developerActions';
import { clearAllErrors } from '@/actions/errorActions';
import TechnologiesList from './components/List';
import ProjectForm from './ProjectForm';

class ProjectsContainer extends Component {
  static initialFormState = {
    formType: null,
    formObject: null,
    formErrors: null,
    formVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      optionsTechnology: [],
      optionsDeveloper: [],
      ...this.constructor.initialFormState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    switch (state.formType) {
      case 'create':
        return {
          formErrors: props.createErrors,
          optionsTechnology: props.technologyItems.map(({ id, name }) => ({ label: name, value: id })),
          optionsDeveloper: props.developerItems.map(({ id, name }) => ({ label: name, value: id })),
        };
      case 'update':
        return {
          formErrors: props.updateErrors,
          optionsTechnology: props.technologyItems.map(({ id, name }) => ({ label: name, value: id })),
          optionsDeveloper: props.developerItems.map(({ id, name }) => ({ label: name, value: id })),
        };
      default:
        return {
          formErrors: null,
        };
    }
  }

  componentDidMount() {
    const {
      page,
      fetchProjects,
      fetchDevelopers,
      fetchTechnologies,
    } = this.props;

    fetchProjects({ page });
    fetchTechnologies({ page: 1 });
    fetchDevelopers({ page: 1 });
  }

  handleRefreshTechnologies() {
    const {
      baseErrors,
      createErrors,
      updateErrors,
      fetchProjects,
    } = this.props;

    const hasError =
      (!!baseErrors && baseErrors.length > 0) ||
      (!!createErrors && createErrors.length > 0) ||
      (!!updateErrors && updateErrors.length > 0);

    if (!hasError) {
      fetchProjects({ page: 1 });
    }
  }

  handleOkForm = ({ id, ...submittedData }) => {
    const { formType } = this.state;

    const { createProject, updateProject } = this.props;

    if (formType === 'create') {
      createProject(submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshTechnologies();
      });
    }

    if (formType === 'update') {
      updateProject(id, submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshTechnologies();
      });
    }
  };

  handleCancleForm = () => {
    this.setState({ ...this.constructor.initialFormState });
  };

  handleClickAddNewProject = () => {
    this.setState({
      formVisible: true,
      formType: 'create',
      formObject: {
        name: null,
        endDate: null,
        developerIds: [],
        technologyIds: [],
        description: null,
        startDate: moment(),
      },
    });
  };

  handleClickEditProject = (project) => {
    const {
      id,
      name,
      endDate,
      startDate,
      developers,
      description,
      technologies,
    } = project;

    this.setState({
      formVisible: true,
      formType: 'update',
      formObject: {
        id,
        name,
        description,
        developerIds: developers.map(dev => `${dev.id}`),
        technologyIds: technologies.map(tech => `${tech.id}`),
        endDate: endDate && moment(endDate, 'DD-MM-YYYY'),
        startDate: startDate && moment(startDate, 'DD-MM-YYYY'),
      },
    });
  };

  handleClickDeleteProject = ({ id }) => {
    const { deleteProject } = this.props;

    deleteProject(id).then(() => {
      this.handleRefreshTechnologies();
    });
  };

  handleClearErrors = () => {
    const { clearAllErrors } = this.props;
    clearAllErrors();
  }

  render() {
    const {
      items,
      loading,
    } = this.props;

    const {
      formType,
      formErrors,
      formObject,
      formVisible,
      optionsDeveloper,
      optionsTechnology,
    } = this.state;

    return (
      <div className="projects-container">
        <HeaderSection
          title="Projects"
          extra={[
            <Button
              type='primary'
              key='newProject'
              onClick={this.handleClickAddNewProject}
            >
              Add New Project
            </Button>,
          ]}
        />

        <TechnologiesList
          items={items}
          loading={loading}
          onClickEdit={this.handleClickEditProject}
          onClickDelete={this.handleClickDeleteProject}
        />

        <ProjectForm
          destroyOnClose
          formType={formType}
          maskClosable={false}
          visible={formVisible}
          formErrors={formErrors}
          formObject={formObject}
          confirmLoading={loading}
          onOk={this.handleOkForm}
          onCancel={this.handleCancleForm}
          optionsTechnology={optionsTechnology}
          optionsDeveloper={optionsDeveloper}
          handleClearErrors={this.handleClearErrors}
        />
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  loading: PropTypes.bool,
  updateProject: PropTypes.func,
  createProject: PropTypes.func,
  deleteProject: PropTypes.func,
  fetchProjects: PropTypes.func,
  clearAllErrors: PropTypes.func,
  fetchDevelopers: PropTypes.func,
  developerItems: PropTypes.array,
  technologyItems: PropTypes.array,
  fetchTechnologies: PropTypes.func,
  baseErrors: PropTypes.arrayOf(PropTypes.string),
  createErrors: PropTypes.arrayOf(PropTypes.string),
  updateErrors: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ project, technology, developer, error }) => ({
  page: project.page,
  baseErrors: error.base,
  items: project.items,
  loading: project.loading,
  totalItems: project.totalItems,
  createErrors: error.createProject,
  updateErrors: error.updateProject,
  technologyItems: technology.items,
  developerItems: developer.items
});

export default connect(mapStateToProps, {
  updateProject,
  createProject,
  deleteProject,
  fetchProjects,
  clearAllErrors,
  fetchDevelopers,
  fetchTechnologies,
})(ProjectsContainer);
