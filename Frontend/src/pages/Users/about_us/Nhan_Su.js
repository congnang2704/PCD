import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_NhanSu from "./Container_NhanSu/Container_NhanSu";

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
