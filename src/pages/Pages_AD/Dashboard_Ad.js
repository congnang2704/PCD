import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_chuan_19062025.png';
import User_Dashboard from './User_Dashboard';
import DuAn_Dashboard from './DuAn_Dashboard';
import {
  AppstoreOutlined,
  FileTextOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  ReadOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(''); // Thêm state này
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
  switch (selectedKey) {
    case '1':
      return (
        <div>
          <User_Dashboard />
        </div>
      );
    case '2':
      return (
        <div>
          <DuAn_Dashboard />
        </div>
      );
    case '3':
      return <div>Đây là trang Công việc</div>;
    case '4':
      return <div>Đây là trang Dịch Vụ</div>;
    case '5':
      return <div>Đây là trang Tin Tức</div>;
    case '6':
      return <div>Đây là trang Tuyển Dụng</div>;
    case '7':
      return <div>Đây là trang Tài Liệu</div>;
    default:
      return null;
  }
};

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Tài Khoản',
              onClick: () => {
                setSelectedKey('1');
                navigate('/user-dashboard');
              },
            },
            {
              key: '2',
              icon: <ProjectOutlined />,
              label: 'Quản lý Dự Án',
              onClick: () => setSelectedKey('2'),
            },
            {
              key: '3',
              icon: <ScheduleOutlined />,
              label: 'Công việc',
              onClick: () => setSelectedKey('3'),
            },
            {
              key: '4',
              icon: <AppstoreOutlined />,
              label: 'Dịch Vụ',
              onClick: () => setSelectedKey('4'),
            },
            {
              key: '5',
              icon: <ReadOutlined />,
              label: 'Tin Tức',
              onClick: () => setSelectedKey('5'),
            },
            {
              key: '6',
              icon: <IdcardOutlined />,
              label: 'Tuyển Dụng',
              onClick: () => setSelectedKey('6'),
            },
            {
              key: '7',
              icon: <FileTextOutlined />,
              label: 'Tài Liệu',
              onClick: () => setSelectedKey('7'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', left: 0 }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div className="logo">
              <img src={logo} alt="Logo" style={{ width: 400, height: 50,  borderRadius: 10,}} />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;