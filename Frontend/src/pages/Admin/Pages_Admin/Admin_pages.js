// src/pages/Pages_Admin/LayoutDashboardWrapper.js
import React from "react";
import { Outlet } from "react-router-dom";
// import LayoutDashboard from "./components/Layout_Admin/Dashboard/Layout_Dashboard";
import LayoutDashboard from "../Dashboard/Layout_Dashboard";

const LayoutDashboardWrapper = () => {
  const [visible, setVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LayoutDashboard
      visible={visible}
      setVisible={setVisible}
      isMobile={isMobile}
    >
      <Outlet />
    </LayoutDashboard>
  );
};

export default LayoutDashboardWrapper;
