import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_BlogDetail_DV from "./BlogDetail_DV/BlogDetail_DV";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_BlogDetail_DV />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
