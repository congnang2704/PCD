import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Con_Du_An from "./Con_Du_An/Con_Du_An";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Con_Du_An />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
