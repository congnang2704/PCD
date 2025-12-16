import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Architec_Designs from "./Architec_KienTruc/Architec";

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
