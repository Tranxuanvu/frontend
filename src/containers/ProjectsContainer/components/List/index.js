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

class ProjectsList extends Component {
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
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Technologies',
              dataIndex: 'technologies',
              key: 'technologies',
              render: (technologies) => (
                  <div>
                    {technologies.map(({ id, name }) => (
                      <Tag color="blue" key={name}>
                        {name}
                      </Tag>
                    ))}
                  </div>
                ),
            },
            {
              title: 'Developers',
              dataIndex: 'developers',
              key: 'developers',
              render: (devlopers) => (
                <div>
                  {devlopers.map(({ id, name }) => (
                    <Tag color="volcano" key={name}>
                      {name}
                    </Tag>
                  ))}
                </div>
              ),
            },
            {
              title: 'Start Date',
              dataIndex: 'startDate',
              key: 'startDate',
            },
            {
              title: 'End Date',
              dataIndex: 'endDate',
              key: 'endDate',
            },
            {
              title: 'Action',
              key: 'action',
              width: '20%',
              render: (_, project) => (
                <Space size='middle'>
                  <Button
                    type='dashed'
                    icon={<EditOutlined />}
                    onClick={() => onClickEdit(project)}
                  />
                  <Popconfirm
                    title='Are you sure to delete?'
                    onConfirm={() => onClickDelete(project)}
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

ProjectsList.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default ProjectsList;
