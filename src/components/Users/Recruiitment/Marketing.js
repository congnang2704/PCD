import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
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
