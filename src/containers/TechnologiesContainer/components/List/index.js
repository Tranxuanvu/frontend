import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Space,
  Button,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

class TechnologiesList extends Component {
  render() {
    const {
      items,
      loading,
      onClickEdit,
      onClickDelete,
    } = this.props;

    return (
      <div>
        <Table
          bordered
          size="middle"
          loading={loading}
          dataSource={items}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
              width: '5%',
              align: 'center',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Action',
              key: 'action',
              width: '20%',
              render: (_, technology) => (
                <Space size='middle'>
                  <Button
                    type='dashed'
                    icon={<EditOutlined />}
                    onClick={() => onClickEdit(technology)}
                  />
                  <Popconfirm
                    title='Are you sure to delete?'
                    onConfirm={() => onClickDelete(technology)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button danger type='dashed' icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

TechnologiesList.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default TechnologiesList;
