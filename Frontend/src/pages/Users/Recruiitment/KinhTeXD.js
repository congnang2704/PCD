import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_KinhTeXD from "./NV_KinhTe_XD/NV_KinhTe_XD";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_KinhTeXD />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
