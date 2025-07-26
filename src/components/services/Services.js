import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import Container_Services from "../../components/services/Container_Services/Container_Services";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_Services />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
