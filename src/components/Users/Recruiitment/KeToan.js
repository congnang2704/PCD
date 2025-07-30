import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_KeToan from "./Ke_Toan/ke_toan";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_KeToan />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
