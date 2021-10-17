import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Input,
} from 'antd';
import ErrorAlert from '@/components/ErrorAlert';

class TechnologyForm extends PureComponent {
  formRef = React.createRef();

  handleOk = () => {
    const { onOk, formObject } = this.props;

    this.formRef.current
      .validateFields()
      .then((values) => {
        const data = {
          id: formObject.id,
          name: values.name,
        };
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
        return 'Create Technology';
      case 'update':
        return 'Update Technology';
      default:
        return 'Technology';
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
            hideRequiredMark
            layout='vertical'
            ref={this.formRef}
            initialValues={formObject}
          >
            <Form.Item
              name='name'
              label='Name'
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input placeholder='Name' />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

TechnologyForm.propTypes = {
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  formType: PropTypes.string,
  maskClosable: PropTypes.bool,
  formErrors: PropTypes.object,
  formObject: PropTypes.object,
  confirmLoading: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
};

export default TechnologyForm;
