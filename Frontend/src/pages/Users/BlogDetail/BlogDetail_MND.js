import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_BlogDetail_MND from "./BlogDetail_MND/BlogDetail_MND";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_BlogDetail_MND />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
