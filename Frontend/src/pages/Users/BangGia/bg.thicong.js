import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import BG_ThiCong from "./BG_ThiCong/BG.ThiCong";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <BG_ThiCong />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
