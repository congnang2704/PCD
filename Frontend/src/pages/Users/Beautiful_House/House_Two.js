import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_HouseTwo from "./House_Two/Container_HouseTwo";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_HouseTwo />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
