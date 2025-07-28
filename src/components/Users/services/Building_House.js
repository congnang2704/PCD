import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Building_Houses from "./Building_House/Building_Houses";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Building_Houses />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
