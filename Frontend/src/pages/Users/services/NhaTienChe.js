import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import NhaTienChe from "./NhaTienChe/NhaTienChe";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <NhaTienChe />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
