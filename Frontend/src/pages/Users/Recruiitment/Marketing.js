import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_Marketing from "./NV_Marketing/Marketing";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_Marketing />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
