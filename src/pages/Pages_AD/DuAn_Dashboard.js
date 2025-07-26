import React from 'react';
import { Space, Table, Tag, Button } from 'antd';

const columns = [
  {
    title: 'Tên Dự Án',
    dataIndex: 'tenDuAn',
    key: 'tenDuAn',
    render: text => <b>{text}</b>,
  },
  {
    title: 'Trưởng Dự Án',
    dataIndex: 'truongDuAn',
    key: 'truongDuAn',
  },
  {
    title: 'Thành Viên',
    dataIndex: 'thanhVien',
    key: 'thanhVien',
    render: members => members.join(', '),
  },
  {
    title: 'Tiến Độ',
    dataIndex: 'tienDo',
    key: 'tienDo',
    render: progress => (
      <Tag color={progress === 'Hoàn thành' ? 'green' : progress === 'Đang làm' ? 'geekblue' : 'volcano'}>
        {progress}
      </Tag>
    ),
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Sửa</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    tenDuAn: 'Công trình A',
    truongDuAn: 'Nguyễn Văn A',
    thanhVien: ['Nguyễn Văn B', 'Trần Thị C'],
    tienDo: 'Hoàn thành',
  },
  {
    key: '2',
    tenDuAn: 'Công trình B',
    truongDuAn: 'Trần Văn D',
    thanhVien: ['Lê Văn E', 'Phạm Thị F'],
    tienDo: 'Đang làm',
  },
  {
    key: '3',
    tenDuAn: 'Công trình C',
    truongDuAn: 'Phạm Văn G',
    thanhVien: ['Ngô Thị H', 'Vũ Văn I'],
    tienDo: 'Chậm tiến độ',
  },
];

const DuAn_Dashboard = () => (
  <div>
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      bordered
      title={() => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Bảng Quản Lý Dự Án</div>
          <Button type="primary">Thêm Dự Án Mới</Button>
        </div>
      )}
    />
  </div>
);

export default DuAn_Dashboard;