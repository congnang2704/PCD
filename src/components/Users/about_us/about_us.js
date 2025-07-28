import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_AboutUs from "./Container_Abouts/Container_Abouts";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_AboutUs />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
