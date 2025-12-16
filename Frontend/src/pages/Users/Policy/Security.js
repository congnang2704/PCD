import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import SecurityPolicy from "./Security/Container_Security";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <SecurityPolicy />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
