import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Input,
  DatePicker,
} from 'antd';
import ErrorAlert from '@/components/ErrorAlert';
import DebounceSelect from '@/components/DebounceSelect';

const validateMessages = {
  required: 'is required!',
};

class ProjectForm extends PureComponent {
  formRef = React.createRef();

  handleOk = () => {
    const { onOk, formObject, formType } = this.props;

    this.formRef.current
      .validateFields()
      .then((values) => {
        const data = {
          id: formObject.id,
          project: {
            name: values.name,
            description: values.description,
            technologyIds: values.technologyIds,
            endDate: values.endDate?.format('DD/MM/YYYY'),
          }
        };

        if (formType === 'create') {
          data.project.startDate = values.startDate?.format('DD/MM/YYYY');
        }

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
        return 'Create Project';
      case 'update':
        return 'Update Project';
      default:
        return 'Project';
    }
  };

  render() {
    const {
      visible,
      formType,
      formErrors,
      formObject,
      maskClosable,
      destroyOnClose,
      confirmLoading,
      optionsDeveloper,
      optionsTechnology,
    } = this.props;
    const title = this.modalTitle();

    return (
      <div className='technology-form-container'>
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
              name='name'
              label='Name'
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
              name='description'
              label='Description'
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input placeholder='Description' />
            </Form.Item>

            <Form.Item
              multiple
              label="Technologies"
              name="technologyIds"
              rules={[{ required: true }]}
            >
              <DebounceSelect
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Technology"
                optionInit={optionsTechnology}
              />
            </Form.Item>

            <Form.Item
              multiple
              label="Developers"
              name="developerIds"
            >
              <DebounceSelect
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Developer"
                optionInit={optionsDeveloper}
              />
            </Form.Item>

            {formType === 'create' && (
              <Form.Item
                name='startDate'
                label='Start Date'
                hasFeedback
                rules={[{ required: true }]}
              >
                <DatePicker
                  format='DD-MM-YYYY'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}

            <Form.Item
              name='endDate'
              label='End Date'
              hasFeedback
            >
              <DatePicker
                format='DD-MM-YYYY'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ProjectForm.propTypes = {
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  formType: PropTypes.string,
  maskClosable: PropTypes.bool,
  formErrors: PropTypes.object,
  formObject: PropTypes.object,
  confirmLoading: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  optionsDeveloper: PropTypes.array,
  optionsTechnology: PropTypes.array,
};

export default ProjectForm;
