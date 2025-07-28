import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Architec_Designs from "./Architec_Design/Architec";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Architec_Designs />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
