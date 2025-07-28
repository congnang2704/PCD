import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Interior_Design from "./Interior_Design/Interior";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Interior_Design />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
