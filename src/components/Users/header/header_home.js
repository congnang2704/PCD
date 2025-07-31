import React, { useState } from "react";
import logo from "../../../assets/logo_chuan_19062025.png";
import "./header_home.css";

import { Layout, Menu, Input, Grid, Button, Drawer } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const headerStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#096cb5",
  padding: "0 20px",
  position: "sticky",
  top: 0,
  zIndex: 100,
  width: "100%",
};

const desktopMenuStyle = {
  flex: 1,
  fontWeight: "bold",
  marginLeft: "-580px",
  display: "flex",
};

const HeaderHome = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const screens = useBreakpoint();
  const location = useLocation();

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const toggleSubMenu = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isSelected = (path) => location.pathname === path;

  const DesktopMenu = () => (
    <Menu
      mode="horizontal"
      className="menu-desktop"
      style={desktopMenuStyle}
      selectedKeys={isSelected("/") ? ["trang-chu"] : []}
    >
      <Menu.Item key="trang-chu" className="menu-item menu-home">
        <Link to="/">TRANG CHỦ</Link>
      </Menu.Item>

      <SubMenu
        key="gioi-thieu"
        className="menu-submenu menu-about"
        title={
          <Link className="menu-title" to="/gioi-thieu">
            GIỚI THIỆU
          </Link>
        }
      >
        <Menu.Item key="about:1" className="menu-subitem menu-about-item">
          <Link to="/gioi-thieu">Về chúng tôi</Link>
        </Menu.Item>
        <Menu.Item key="about:2" className="menu-subitem menu-about-item">
          <Link to="/nhan-su">Nhân Sự Nguyễn Hải</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="dich_vu"
        className="menu-submenu menu-services"
        title={
          <Link className="menu-title" to="/dich-vu">
            DỊCH VỤ
          </Link>
        }
      >
        <Menu.Item key="dich_vu:1" className="menu-subitem menu-services-item">
          <Link to="/dich-vu/thiet-ke-kien-truc">Thiết kế kiến trúc</Link>
        </Menu.Item>
        <Menu.Item key="dich_vu:2" className="menu-subitem menu-services-item">
          <Link to="/dich-vu/thiet-ke-noi-that">Thiết kế nội thất</Link>
        </Menu.Item>
        <Menu.Item key="dich_vu:3" className="menu-subitem menu-services-item">
          <Link to="/dich-vu/thi-cong-tho">Thi công thô</Link>
        </Menu.Item>
        <Menu.Item key="dich_vu:4" className="menu-subitem menu-services-item">
          <Link to="/dich-vu/thi-cong-hoan-thien">Thi công hoàn thiện</Link>
        </Menu.Item>
        <Menu.Item key="dich_vu:5" className="menu-subitem menu-services-item">
          <Link to="/dich-vu/xay-nha-tron-goi">Xây nhà trọn gói</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="mau-nha-dep"
        className="menu-submenu menu-projects"
        title={
          <Link className="menu-title" to="/mau-nha-dep">
            MẪU NHÀ ĐẸP
          </Link>
        }
      >
        <Menu.Item
          key="mau-nha-dep:1"
          className="menu-subitem menu-projects-item"
        >
          <Link to="/mau-nha-dep/nha-2-tang">Nhà 2 tầng</Link>
        </Menu.Item>
        <Menu.Item
          key="mau-nha-dep:2"
          className="menu-subitem menu-projects-item"
        >
          <Link to="/mau-nha-dep/nha-3-tang">Nhà 3 tầng</Link>
        </Menu.Item>
        <Menu.Item
          key="mau-nha-dep:3"
          className="menu-subitem menu-projects-item"
        >
          <Link to="/mau-nha-dep/nha-5-tang">Nhà 5 tầng</Link>
        </Menu.Item>
        <Menu.Item
          key="mau-nha-dep:4"
          className="menu-subitem menu-projects-item"
        >
          <Link to="/mau-nha-dep/biet-thu">Biệt thự</Link>
        </Menu.Item>
        <Menu.Item
          key="mau-nha-dep:5"
          className="menu-subitem menu-projects-item"
        >
          <Link to="/mau-nha-dep/khach-san">Căn hộ, Khách sạn</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="tuyen-dung" className="menu-item menu-recruitment">
        <Link to="/tuyen-dung">TUYỂN DỤNG</Link>
      </Menu.Item>

      <Menu.Item key="lien-he" className="menu-item menu-contact">
        <Link to="/lien-he">LIÊN HỆ</Link>
      </Menu.Item>

      <Menu.Item key="search" className="menu-item menu-search">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm..."
          style={{ width: 180 }}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={headerStyle}>
      {!screens.lg && (
        <>
          <Button
            className="menu-button-mobile"
            type="text"
            onClick={showDrawer}
            icon={<MenuOutlined />}
          />
          <Drawer
            title={null}
            placement="left"
            onClose={closeDrawer}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              style={{ border: "none" }}
              className="mobile-menu-custom"
            >
              <Menu.Item key="home" onClick={closeDrawer}>
                <Link to="/">TRANG CHỦ</Link>
              </Menu.Item>

              <Menu.SubMenu
                key="gioi-thieu"
                title="GIỚI THIỆU"
                onTitleClick={() => toggleSubMenu("gioi-thieu")}
              >
                <Menu.Item key="about:1" onClick={closeDrawer}>
                  <Link to="/gioi-thieu">Về chúng tôi</Link>
                </Menu.Item>
                <Menu.Item key="about:2" onClick={closeDrawer}>
                  <Link to="/nhan-su">Nhân sự Nguyễn Hải</Link>
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.SubMenu
                key="dich-vu"
                title="DỊCH VỤ"
                onTitleClick={() => toggleSubMenu("dich-vu")}
              >
                <Menu.Item key="dich-vu:1" onClick={closeDrawer}>
                  <Link to="/dich-vu/thiet-ke-kien-truc">
                    Thiết kế kiến trúc
                  </Link>
                </Menu.Item>
                <Menu.Item key="dich-vu:2" onClick={closeDrawer}>
                  <Link to="/dich-vu/thiet-ke-noi-that">Thiết kế nội thất</Link>
                </Menu.Item>
                <Menu.Item key="dich-vu:3" onClick={closeDrawer}>
                  <Link to="/dich-vu/thi-cong-tho">Thi công thô</Link>
                </Menu.Item>
                <Menu.Item key="dich-vu:4" onClick={closeDrawer}>
                  <Link to="/dich-vu/thi-cong-hoan-thien">
                    Thi công hoàn thiện
                  </Link>
                </Menu.Item>
                <Menu.Item key="dich-vu:5" onClick={closeDrawer}>
                  <Link to="/dich-vu/xay-nha-tron-goi">Xây nhà trọn gói</Link>
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.SubMenu
                key="mau-nha-dep"
                title="MẪU NHÀ ĐẸP"
                onTitleClick={() => toggleSubMenu("mau-nha-dep")}
              >
                <Menu.Item key="mau-nha-dep:1" onClick={closeDrawer}>
                  <Link to="/mau-nha-dep/nha-2-tang">Nhà 2 tầng</Link>
                </Menu.Item>
                <Menu.Item key="mau-nha-dep:2" onClick={closeDrawer}>
                  <Link to="/mau-nha-dep/nha-3-tang">Nhà 3 tầng</Link>
                </Menu.Item>
                <Menu.Item key="mau-nha-dep:3" onClick={closeDrawer}>
                  <Link to="/mau-nha-dep/nha-5-tang">Nhà 5 tầng</Link>
                </Menu.Item>
                <Menu.Item key="mau-nha-dep:4" onClick={closeDrawer}>
                  <Link to="/mau-nha-dep/biet-thu">Biệt thự</Link>
                </Menu.Item>
                <Menu.Item key="mau-nha-dep:5" className="menu-projects-item">
                  <Link to="/mau-nha-dep/khach-san">Căn hộ, Khách sạn</Link>
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.Item key="tuyen-dung" onClick={closeDrawer}>
                <Link to="/tuyen-dung">TUYỂN DỤNG</Link>
              </Menu.Item>
              <Menu.Item key="lien-he" onClick={closeDrawer}>
                <Link to="/lien-he">LIÊN HỆ</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </>
      )}
      <div className="logo-center-mobile" style={{ flex: 1 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: 50, borderRadius: 8 }} />
        </Link>
      </div>
      {screens.lg ? <DesktopMenu /> : null}
      {!screens.lg && <div style={{ width: 20 }}></div>}
    </Header>
  );
};

export default HeaderHome;
