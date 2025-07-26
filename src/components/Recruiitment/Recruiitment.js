import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import Container_Recruiitment from "./Container_Recruiitment";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_Recruiitment />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
