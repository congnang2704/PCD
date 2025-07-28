import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_HouseThree from "../Beautiful_House/House_Three/Container_HouseThree";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_HouseThree />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
