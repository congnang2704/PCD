import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import Container_History from "../about_us/Container_History/Container_History";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_History />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
