import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import BG_VatLieu from "./HD_BG_VatLieu/BG.VatLieu";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <BG_VatLieu />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
