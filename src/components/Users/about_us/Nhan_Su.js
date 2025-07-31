import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_NhanSu from "./Container_History/Container_NhanSu";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_NhanSu />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
