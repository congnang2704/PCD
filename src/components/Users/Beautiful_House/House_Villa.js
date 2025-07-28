import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "..//footer/footer_home";
import Container_HouseVilla from "../Beautiful_House/House_Villa/Container_HoseVilla";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_HouseVilla />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
