import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Input,
} from 'antd';
import ErrorAlert from '@/components/ErrorAlert';
import DebounceSelect from '@/components/DebounceSelect';

const validateMessages = {
  required: 'is required!',
};

class DeveloperForm extends PureComponent {
  formRef = React.createRef();

  handleOk = () => {
    const { onOk, formObject } = this.props;

    this.formRef.current
      .validateFields()
      .then((values) => {
        const data = {
          id: formObject.id,
          developer: {
            lastName: values.lastName,
            firstName: values.firstName,
            projectIds: values.projectIds,
          }
        };
        console.log('🚀 ~ file: DeveloperForm.js ~ line 32 ~ DeveloperForm ~ .then ~ data', data);
        onOk(data);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  modalTitle = () => {
    const { formType } = this.props;

    switch (formType) {
      case 'create':
        return 'Create Developer';
      case 'update':
        return 'Update Developer';
      default:
        return 'Developer';
    }
  };

  render() {
    const {
      visible,
      formErrors,
      formObject,
      maskClosable,
      destroyOnClose,
      confirmLoading,
      optionsProject,
    } = this.props;
    const title = this.modalTitle();

    return (
      <div className='developer-form-container'>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          maskClosable={maskClosable}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
          destroyOnClose={destroyOnClose}
        >
          <ErrorAlert errors={formErrors} />
          <Form
            colon={false}
            layout='vertical'
            ref={this.formRef}
            initialValues={formObject}
            validateMessages={validateMessages}
          >
            <Form.Item
              name='firstName'
              label='First Name'
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input placeholder='First Name' />
            </Form.Item>

            <Form.Item
              name='lastName'
              label='Last Name'
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input placeholder='Last Name' />
            </Form.Item>

            <Form.Item
              multiple
              label="Projects"
              name="projectIds"
              rules={[{ required: true }]}
            >
              <DebounceSelect
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Project"
                optionInit={optionsProject}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

DeveloperForm.propTypes = {
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  formType: PropTypes.string,
  maskClosable: PropTypes.bool,
  formErrors: PropTypes.object,
  formObject: PropTypes.object,
  confirmLoading: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  optionsProject: PropTypes.func,
};

export default DeveloperForm;
