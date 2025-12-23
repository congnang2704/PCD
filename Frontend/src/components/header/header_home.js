import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Input, Grid, Button, Drawer, Dropdown } from "antd";
import { SearchOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logopcdnguyenhai.webp";
import "./header_home.css";
import AccountInfoDrawer from "./AccountInfoDrawer";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderHome = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [showAccount, setShowAccount] = useState(false);

  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role_id?.name) {
      const roleName = user.role_id.name.toLowerCase();
      if (roleName === "admin" || roleName === "editor") {
        navigate("/haiadmin/dashboard");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleOpenAccount = () => setShowAccount(true);
  const handleCloseAccount = () => setShowAccount(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // ========== Helper: find selected key by pathname ==========
  const selectedKey = useMemo(() => {
    const p = location.pathname;

    // match chính xác trước
    const exact = new Set([
      "/",
      "/gioi-thieu",
      "/nhan-su",
      "/dich-vu",
      "/dich-vu/thiet-ke-kien-truc",
      "/dich-vu/thiet-ke-noi-that",
      "/dich-vu/thiet-ke-thi-cong-van-phong",
      "/dich-vu/thiet-ke-nha-dep",
      "/dich-vu/thi-cong-tho",
      "/dich-vu/thi-cong-hoan-thien",
      "/dich-vu/xay-nha-tron-goi",
      "/dich-vu/thi-cong-biet-thu",
      "/dich-vu/cai-tao-nha-cua",
      "/dich-vu/nha-tien-che",
      "/dich-vu/thi-cong-tron-goi-karaoke",
      "/dich-vu/xin-giay-phep-xay-dung",
      "/mau-nha-dep",
      "/mau-nha-dep/nha-2-tang",
      "/mau-nha-dep/nha-3-tang",
      "/mau-nha-dep/nha-5-tang",
      "/mau-nha-dep/biet-thu",
      "/mau-nha-dep/khach-san",
      "/du-an",
      "/bang-gia-thiet-ke",
      "/tuyen-dung",
      "/lien-he",
    ]);

    if (exact.has(p)) return [p];

    // dynamic routes
    if (p.startsWith("/dich-vu/")) return ["/dich-vu"];
    if (p.startsWith("/mau-nha-dep/")) return ["/mau-nha-dep"];

    return [];
  }, [location.pathname]);

  // ========== Dropdown account items (AntD v5 chuẩn) ==========
  const accountItems = useMemo(() => {
    if (user) {
      return [
        {
          key: "info",
          label: "👤 Thông tin tài khoản",
          onClick: handleOpenAccount,
        },
        {
          key: "logout",
          label: "🚪 Đăng xuất",
          onClick: handleLogout,
        },
      ];
    }
    return [
      {
        key: "login",
        label: "🔐 Đăng nhập",
        onClick: () => navigate("/haiadmin/login"),
      },
      {
        key: "register",
        label: "📝 Đăng ký",
        onClick: () => navigate("/haiadmin/register"),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ========== Desktop Menu items (AntD v5 items) ==========
  const desktopItems = useMemo(
    () => [
      {
        key: "/",
        label: <Link to="/">TRANG CHỦ</Link>,
        className: "menu-item menu-home",
      },

      {
        key: "gioi-thieu",
        label: (
          <Link className="menu-title" to="/gioi-thieu">
            GIỚI THIỆU
          </Link>
        ),
        className: "menu-submenu menu-about",
        children: [
          {
            key: "/gioi-thieu",
            label: <Link to="/gioi-thieu">Về chúng tôi</Link>,
            className: "menu-subitem",
          },
          {
            key: "/nhan-su",
            label: <Link to="/nhan-su">Nhân Sự Nguyễn Hải</Link>,
            className: "menu-subitem",
          },
        ],
      },

      // ===== DỊCH VỤ (submenu lồng nhau, xổ ngang) =====
      {
        key: "dich-vu",
        label: (
          <Link className="menu-title" to="/dich-vu">
            DỊCH VỤ
          </Link>
        ),
        className: "menu-submenu menu-services",
        children: [
          {
            key: "dv-thiet-ke",
            label: "Thiết kế",
            className: "menu-subgroup",
            children: [
              {
                key: "/dich-vu/thiet-ke-kien-truc",
                label: (
                  <Link to="/dich-vu/thiet-ke-kien-truc">
                    Thiết kế kiến trúc
                  </Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thiet-ke-noi-that",
                label: (
                  <Link to="/dich-vu/thiet-ke-noi-that">Thiết kế nội thất</Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thiet-ke-thi-cong-van-phong",
                label: (
                  <Link to="/dich-vu/thiet-ke-thi-cong-van-phong">
                    Thiết kế thi công văn phòng
                  </Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thiet-ke-nha-dep",
                label: (
                  <Link to="/dich-vu/thiet-ke-nha-dep">
                    Thiết kế nhà phố đẹp
                  </Link>
                ),
                className: "menu-subitem",
              },
            ],
          },

          {
            key: "dv-thi-cong",
            label: "Thi công",
            className: "menu-subgroup",
            children: [
              {
                key: "/dich-vu/thi-cong-tho",
                label: <Link to="/dich-vu/thi-cong-tho">Thi công thô</Link>,
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thi-cong-hoan-thien",
                label: (
                  <Link to="/dich-vu/thi-cong-hoan-thien">
                    Thi công hoàn thiện
                  </Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/xay-nha-tron-goi",
                label: (
                  <Link to="/dich-vu/xay-nha-tron-goi">Xây nhà trọn gói</Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thi-cong-biet-thu",
                label: (
                  <Link to="/dich-vu/thi-cong-biet-thu">Thi công biệt thự</Link>
                ),
                className: "menu-subitem",
              },
            ],
          },

          {
            key: "dv-cai-tao",
            label: "Cải tạo & chuyên biệt",
            className: "menu-subgroup",
            children: [
              {
                key: "/dich-vu/cai-tao-nha-cua",
                label: (
                  <Link to="/dich-vu/cai-tao-nha-cua">
                    Sửa chữa – Cải tạo nhà
                  </Link>
                ),
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/nha-tien-che",
                label: <Link to="/dich-vu/nha-tien-che">Nhà tiền chế</Link>,
                className: "menu-subitem",
              },
              {
                key: "/dich-vu/thi-cong-tron-goi-karaoke",
                label: (
                  <Link to="/dich-vu/thi-cong-tron-goi-karaoke">
                    Thi công trọn gói Karaoke
                  </Link>
                ),
                className: "menu-subitem",
              },
            ],
          },

          {
            key: "dv-khac",
            label: "Khác",
            className: "menu-subgroup",
            children: [
              {
                key: "/dich-vu/xin-giay-phep-xay-dung",
                label: (
                  <Link to="/dich-vu/xin-giay-phep-xay-dung">
                    Xin giấy phép xây dựng đà nẵng
                  </Link>
                ),
                className: "menu-subitem",
              },
            ],
          },
        ],
      },

      {
        key: "mau-nha-dep",
        label: (
          <Link className="menu-title" to="/mau-nha-dep">
            MẪU NHÀ ĐẸP
          </Link>
        ),
        className: "menu-submenu menu-projects",
        children: [
          {
            key: "/mau-nha-dep/nha-2-tang",
            label: <Link to="/mau-nha-dep/nha-2-tang">Nhà 2 tầng</Link>,
            className: "menu-subitem",
          },
          {
            key: "/mau-nha-dep/nha-3-tang",
            label: <Link to="/mau-nha-dep/nha-3-tang">Nhà 3 tầng</Link>,
            className: "menu-subitem",
          },
          {
            key: "/mau-nha-dep/nha-5-tang",
            label: <Link to="/mau-nha-dep/nha-5-tang">Nhà 5 tầng</Link>,
            className: "menu-subitem",
          },
          {
            key: "/mau-nha-dep/biet-thu",
            label: <Link to="/mau-nha-dep/biet-thu">Biệt thự</Link>,
            className: "menu-subitem",
          },
          {
            key: "/mau-nha-dep/khach-san",
            label: <Link to="/mau-nha-dep/khach-san">Căn hộ, Khách sạn</Link>,
            className: "menu-subitem",
          },
        ],
      },

      {
        key: "/du-an",
        label: <Link to="/du-an">DỰ ÁN</Link>,
        className: "menu-item",
      },
      {
        key: "/bang-gia-thiet-ke",
        label: <Link to="/bang-gia-thiet-ke">BẢNG GIÁ</Link>,
        className: "menu-item",
      },
      {
        key: "/tuyen-dung",
        label: <Link to="/tuyen-dung">TUYỂN DỤNG</Link>,
        className: "menu-item",
      },
      {
        key: "/lien-he",
        label: <Link to="/lien-he">LIÊN HỆ</Link>,
        className: "menu-item menu-contact",
      },
    ],
    []
  );

  // ========== Mobile Menu items (AntD v5 items) ==========
  const mobileItems = useMemo(
    () => [
      { key: "/", label: <Link to="/">TRANG CHỦ</Link>, onClick: closeDrawer },

      {
        key: "m-gioi-thieu",
        label: "GIỚI THIỆU",
        children: [
          {
            key: "/gioi-thieu",
            label: <Link to="/gioi-thieu">Về chúng tôi</Link>,
            onClick: closeDrawer,
          },
          {
            key: "/nhan-su",
            label: <Link to="/nhan-su">Nhân sự Nguyễn Hải</Link>,
            onClick: closeDrawer,
          },
        ],
      },

      {
        key: "m-dich-vu",
        label: "DỊCH VỤ",
        children: [
          {
            key: "m-tk",
            label: "Thiết kế",
            children: [
              {
                key: "/dich-vu/thiet-ke-kien-truc",
                label: (
                  <Link to="/dich-vu/thiet-ke-kien-truc">
                    Thiết kế kiến trúc
                  </Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thiet-ke-noi-that",
                label: (
                  <Link to="/dich-vu/thiet-ke-noi-that">Thiết kế nội thất</Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thiet-ke-nha-dep",
                label: (
                  <Link to="/dich-vu/thiet-ke-nha-dep">
                    Thiết kế nhà phố đẹp
                  </Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thiet-ke-thi-cong-van-phong",
                label: (
                  <Link to="/dich-vu/thiet-ke-thi-cong-van-phong">
                    Thiết kế thi công văn phòng
                  </Link>
                ),
                onClick: closeDrawer,
              },
            ],
          },

          {
            key: "m-tc",
            label: "Thi công",
            children: [
              {
                key: "/dich-vu/thi-cong-tho",
                label: <Link to="/dich-vu/thi-cong-tho">Thi công thô</Link>,
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thi-cong-hoan-thien",
                label: (
                  <Link to="/dich-vu/thi-cong-hoan-thien">
                    Thi công hoàn thiện
                  </Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/xay-nha-tron-goi",
                label: (
                  <Link to="/dich-vu/xay-nha-tron-goi">Xây nhà trọn gói</Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thi-cong-biet-thu",
                label: (
                  <Link to="/dich-vu/thi-cong-biet-thu">Thi công biệt thự</Link>
                ),
                onClick: closeDrawer,
              },
            ],
          },

          {
            key: "m-ct",
            label: "Cải tạo & chuyên biệt",
            children: [
              {
                key: "/dich-vu/cai-tao-nha-cua",
                label: (
                  <Link to="/dich-vu/cai-tao-nha-cua">
                    Sửa chữa – Cải tạo nhà
                  </Link>
                ),
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/nha-tien-che",
                label: <Link to="/dich-vu/nha-tien-che">Nhà tiền chế</Link>,
                onClick: closeDrawer,
              },
              {
                key: "/dich-vu/thi-cong-tron-goi-karaoke",
                label: (
                  <Link to="/dich-vu/thi-cong-tron-goi-karaoke">
                    Thi công trọn gói Karaoke
                  </Link>
                ),
                onClick: closeDrawer,
              },
            ],
          },

          {
            key: "m-khac",
            label: "Khác",
            children: [
              {
                key: "/dich-vu/xin-giay-phep-xay-dung",
                label: (
                  <Link to="/dich-vu/xin-giay-phep-xay-dung">
                    Xin giấy phép xây dựng đà nẵng
                  </Link>
                ),
                onClick: closeDrawer,
              },
            ],
          },
        ],
      },

      {
        key: "mau-nha-dep",
        label: "MẪU NHÀ ĐẸP",
        children: [
          {
            key: "/mau-nha-dep/nha-2-tang",
            label: <Link to="/mau-nha-dep/nha-2-tang">Nhà 2 tầng</Link>,
            onClick: closeDrawer,
          },
          {
            key: "/mau-nha-dep/nha-3-tang",
            label: <Link to="/mau-nha-dep/nha-3-tang">Nhà 3 tầng</Link>,
            onClick: closeDrawer,
          },
          {
            key: "/mau-nha-dep/nha-5-tang",
            label: <Link to="/mau-nha-dep/nha-5-tang">Nhà 5 tầng</Link>,
            onClick: closeDrawer,
          },
          {
            key: "/mau-nha-dep/biet-thu",
            label: <Link to="/mau-nha-dep/biet-thu">Biệt thự</Link>,
            onClick: closeDrawer,
          },
          {
            key: "/mau-nha-dep/khach-san",
            label: <Link to="/mau-nha-dep/khach-san">Căn hộ, Khách sạn</Link>,
            onClick: closeDrawer,
          },
        ],
      },

      {
        key: "/du-an",
        label: <Link to="/du-an">DỰ ÁN</Link>,
        onClick: closeDrawer,
      },
      {
        key: "/bang-gia-thiet-ke",
        label: <Link to="/bang-gia-thiet-ke">BẢNG GIÁ</Link>,
        onClick: closeDrawer,
      },
      {
        key: "/tuyen-dung",
        label: <Link to="/tuyen-dung">TUYỂN DỤNG</Link>,
        onClick: closeDrawer,
      },
      {
        key: "/lien-he",
        label: <Link to="/lien-he">LIÊN HỆ</Link>,
        onClick: closeDrawer,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Header className="site-header">
      <div className="header-inner">
        {!screens.xl && (
          <Button
            className="menu-button-mobile"
            type="text"
            onClick={showDrawer}
            icon={<MenuOutlined />}
          />
        )}

        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Nguyễn Hải Design & Build – Logo" />
          </Link>
        </div>

        <div className="header-center">
          {screens.xl ? (
            <Menu
              mode="horizontal"
              className="menu-desktop"
              items={desktopItems}
              selectedKeys={selectedKey}
            />
          ) : null}
        </div>

        <div className="header-right">
          {screens.xl && (
            <Input
              className="header-search"
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
              allowClear
            />
          )}

          {/* ✅ FIX Dropdown: menu={{ items: ... }} */}
          <Dropdown
            menu={{ items: accountItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <UserOutlined className="Menu-UserOutlined" />
          </Dropdown>
        </div>
      </div>

      {/* ========== Drawer Mobile Menu ========== */}
      <Drawer
        title={null}
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          className="mobile-menu-custom"
          items={mobileItems}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          selectedKeys={selectedKey}
          style={{ border: "none" }}
        />
      </Drawer>

      <AccountInfoDrawer open={showAccount} onClose={handleCloseAccount} />
    </Header>
  );
};

export default HeaderHome;
