import React from 'react';
import { Space, Table, Tag, Button } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'no',
    age: 32,
    address: 'đia chỉ 1',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'no',
    age: 42,
    address: 'đia chỉ 1Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'no',
    age: 32,
    address: 'đia chỉ 1Park',
    tags: ['cool', 'teacher'],
  },
  // ...các dòng dữ liệu khác...
];

const User_Dashboard = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        Bảng Quản Lý Tài Khoản
      </div>
      <Button type="primary">Thêm Tài Khoản</Button>
    </div>
    <Table columns={columns} dataSource={data} />
  </div>
);

export default User_Dashboard;