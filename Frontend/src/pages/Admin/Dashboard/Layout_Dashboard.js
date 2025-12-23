// File: src/components/Admin/Dashboard/Layout_Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Drawer, Button, Dropdown, Avatar } from "antd";
import {
  PieChartOutlined,
  ProjectOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  FileTextOutlined,
  MenuOutlined,
  AppstoreOutlined,
  StarOutlined,
  ContactsOutlined,
  RobotOutlined,
  AimOutlined,
  CodeOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import logo from "../../../assets/logopcdnguyenhai.webp";
import "./Dashboard_Admin.css";
import AccountInfoDrawer from "./AccountInfoDrawer";

const { Header, Sider, Content } = Layout;

const LayoutDashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 992);
  const [user, setUser] = useState(null);
  const [showAccount, setShowAccount] = useState(false);

  // Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auth
  useEffect(() => {
    if (location.pathname.startsWith("/haiadmin")) {
      try {
        const raw = localStorage.getItem("user");
        if (!raw) {
          if (location.pathname !== "/haiadmin/login") {
            navigate("/haiadmin/login", { replace: true });
          }
        } else {
          setUser(JSON.parse(raw));
        }
      } catch {
        navigate("/haiadmin/login", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/haiadmin/login", { replace: true });
  };

  const accountMenu = {
    items: [
      {
        key: "profile",
        label: "👤 Thông tin cá nhân",
        onClick: () => setShowAccount(true),
      },
      {
        key: "logout",
        label: "🚪 Đăng xuất",
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  /** ================= MENU TREE ================= */
  const menuTree = [
    {
      key: "dashboard",
      label: "Tổng quan",
      icon: <PieChartOutlined />,
      path: "/haiadmin/dashboard",
    },
    {
      key: "users",
      label: "Quản lý User",
      icon: <UserSwitchOutlined />,
      path: "/haiadmin/users",
    },
    {
      key: "category",
      label: "Danh mục",
      icon: <AppstoreOutlined />,
      path: "/haiadmin/danh-muc",
    },
    {
      key: "bai-viet",
      label: "Bài viết",
      icon: <FileTextOutlined />,
      path: "/haiadmin/bai-viet",
    },
    {
      key: "du-an",
      label: "Dự án",
      icon: <ProjectOutlined />,
      path: "/haiadmin/du-an",
    },
    {
      key: "danh-gia",
      label: "Đánh giá KH",
      icon: <StarOutlined />,
      path: "/haiadmin/danh-gia",
    },
    {
      key: "ql-lien-he",
      label: "Form liên hệ",
      icon: <ContactsOutlined />,
      path: "/haiadmin/ql-lien-he",
    },
    {
      key: "ql-nhan-su",
      label: "Nhân sự",
      icon: <TeamOutlined />,
      path: "/haiadmin/ql-nhan-su",
    },
    {
      key: "ql-banner",
      label: "Banner",
      icon: <AimOutlined />,
      path: "/haiadmin/ql-banner",
    },
    {
      key: "ql-thuonghieu",
      label: "Quản lý Thương hiệu",
      icon: <TrademarkOutlined />, // 👈 thêm menu thương hiệu
      path: "/haiadmin/ql-thuonghieu",
    },
    {
      key: "ql-chat",
      label: "Chat bot",
      icon: <RobotOutlined />,
      path: "/haiadmin/ql-chat",
    },
    {
      key: "ql-vatlieu",
      label: "Quản lý Vật liệu",
      icon: <AppstoreOutlined />,
      path: "/haiadmin/ql-vatlieu",
    },
    {
      key: "ql-tracking-codes",
      label: "Quản lý CodeJS",
      icon: <CodeOutlined />, // 👈 đổi icon Code
      path: "/haiadmin/tracking-codes",
    },
  ];

  /** build items cho AntD */
  function toAntdItems(nodes) {
    return nodes.map((n) => {
      if (n.children) {
        return {
          key: n.key,
          icon: n.icon,
          label: n.label,
          children: toAntdItems(n.children),
        };
      }
      return {
        key: n.key,
        icon: n.icon,
        label: n.label,
        onClick: () => navigate(n.path),
      };
    });
  }

  const menuItemsForAntd = useMemo(() => toAntdItems(menuTree), []);

  const selectedKey = useMemo(() => {
    const all = [];
    (function walk(nodes) {
      nodes.forEach((n) => {
        all.push(n);
        if (n.children) walk(n.children);
      });
    })(menuTree);

    const match = all
      .filter((n) => n.path)
      .sort((a, b) => (b.path?.length || 0) - (a.path?.length || 0))
      .find((n) => location.pathname.startsWith(n.path));

    return match?.key || "dashboard";
  }, [location.pathname]);

  return (
    <>
      {/* Drawer Mobile */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setVisible(false)}
          open={visible}
          styles={{ body: { padding: 0 } }}
        >
          <div className="drawer-header">
            <img src={logo} alt="logo" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItemsForAntd}
            triggerSubMenuAction="hover"
          />
        </Drawer>
      )}

      <Layout className="admin-dashboard">
        <Header className="admin-header">
          <Button
            className="menu-toggle-btn"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <div className="admin-logo-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="admin-logo-img" />
            </Link>
          </div>
          <div className="admin-header-right">
            {user && (
              <Dropdown
                menu={accountMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="admin-user-pill">
                  <Avatar
                    size={36}
                    src={user.avatar || "https://i.pravatar.cc/40"}
                  />
                  <div className="admin-info">
                    <div className="admin-user-name">{user.name}</div>
                    <small className="admin-user-role">
                      {user?.role_id?.name || "User"}
                    </small>
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
        </Header>

        <Layout className="admin-body">
          {!isMobile && (
            <Sider width={240} className="admin-sidebar">
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                items={menuItemsForAntd}
                triggerSubMenuAction="hover"
              />
            </Sider>
          )}
          <Layout className="admin-layout">
            <Content className="admin-content">
              {children ?? <Outlet />}
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <AccountInfoDrawer
        open={showAccount}
        onClose={() => setShowAccount(false)}
      />
    </>
  );
};

export default LayoutDashboard;
