import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Container_HouseModel from "../Beautiful_House/House_Model/Container_HouseModel";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_HouseModel />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
