import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tag,
  Table,
  Space,
  Button,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

class DevelopersList extends Component {
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
              title: 'First Name',
              dataIndex: 'firstName',
              key: 'name',
            },
            {
              title: 'Last Name',
              dataIndex: 'lastName',
              key: 'name',
            },
            {
              title: 'Projects',
              dataIndex: 'projects',
              key: 'projects',
              render: (projects) => (
                <div>
                  {projects.map(({ id, name }) => (
                    <Tag color="volcano" key={name}>
                      {name}
                    </Tag>
                  ))}
                </div>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              width: '20%',
              render: (_, developer) => (
                <Space size='middle'>
                  <Button
                    type='dashed'
                    icon={<EditOutlined />}
                    onClick={() => onClickEdit(developer)}
                  />
                  <Popconfirm
                    title='Are you sure to delete?'
                    onConfirm={() => onClickDelete(developer)}
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

DevelopersList.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default DevelopersList;
