import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import BG_ThietKe from "./BG_ThietKe/BG.ThietKe";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <BG_ThietKe />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
