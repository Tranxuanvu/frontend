import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import HeaderSection from '@/components/HeaderSection';
import {
  updateTechnology,
  createTechnology,
  deleteTechnology,
  fetchTechnologies,
} from '@/actions/technologyActions';
import ErrorAlert from '@/components/ErrorAlert';
import TechnologiesList from './components/List';
import TechnologyForm from './TechnologyForm';

class TechnologiesContainer extends Component {
  static initialFormState = {
    formType: null,
    formObject: null,
    formErrors: null,
    formVisible: false,
    linksData: null,
    linksVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.constructor.initialFormState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    switch (state.formType) {
      case 'create':
        return {
          formErrors: props.createErrors,
        };
      case 'update':
        return {
          formErrors: props.updateErrors,
        };
      default:
        return {
          formErrors: null,
        };
    }
  }

  componentDidMount() {
    const { fetchTechnologies, page } = this.props;
    fetchTechnologies({ page });
  }

  handleRefreshTechnologies() {
    const { fetchTechnologies } = this.props;
    fetchTechnologies({ page: 1 });
  }

  handleOkForm = ({ id, ...submittedData }) => {
    const { formType } = this.state;

    const { createTechnology, updateTechnology } = this.props;

    if (formType === 'create') {
      createTechnology(submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshTechnologies();
      });
    }

    if (formType === 'update') {
      updateTechnology(id, submittedData).then(() => {
        this.setState({ ...this.constructor.initialFormState });
        this.handleRefreshTechnologies();
      });
    }
  };

  handleCancleForm = () => {
    this.setState({ ...this.constructor.initialFormState });
  };

  handleClickAddNewTechnology = () => {
    this.setState({
      formVisible: true,
      formType: 'create',
      formObject: {
        name: null,
      },
    });
  };

  handleClickEditTechnology = (technology) => {
    this.setState({
      formVisible: true,
      formType: 'update',
      formObject: {
        id: technology.id,
        name: technology.name,
      },
    });
  };

  handleClickDeleteTechnology = ({ id }) => {
    const { deleteTechnology } = this.props;

    deleteTechnology(id).then(() => {
      this.handleRefreshTechnologies();
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
    } = this.state;

    return (
      <div className="technologies-container">
        <ErrorAlert errors={baseErrors} />
        <HeaderSection
          title="Technologies"
          extra={[
            <Button
              type='primary'
              key='newTechnology'
              onClick={this.handleClickAddNewTechnology}
            >
              Add New Technology
            </Button>,
          ]}
        />

        <TechnologiesList
          items={items}
          loading={loading}
          onClickEdit={this.handleClickEditTechnology}
          onClickDelete={this.handleClickDeleteTechnology}
        />

        <TechnologyForm
          destroyOnClose
          formType={formType}
          maskClosable={false}
          visible={formVisible}
          formErrors={formErrors}
          formObject={formObject}
          confirmLoading={loading}
          onOk={this.handleOkForm}
          onCancel={this.handleCancleForm}
        />
      </div>
    );
  }
}

TechnologiesContainer.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  loading: PropTypes.bool,
  updateTechnology: PropTypes.func,
  createTechnology: PropTypes.func,
  deleteTechnology: PropTypes.func,
  fetchTechnologies: PropTypes.func,
  baseErrors: PropTypes.arrayOf(PropTypes.string),
  createErrors: PropTypes.arrayOf(PropTypes.string),
  updateErrors: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ technology, error }) => ({
  page: technology.page,
  baseErrors: error.base,
  items: technology.items,
  loading: technology.loading,
  totalItems: technology.totalItems,
  createErrors: error.createTechnology,
  updateErrors: error.updateTechnology,
});

export default connect(mapStateToProps, {
  updateTechnology,
  createTechnology,
  deleteTechnology,
  fetchTechnologies,
})(TechnologiesContainer);
