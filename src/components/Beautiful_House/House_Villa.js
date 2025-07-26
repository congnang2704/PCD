import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import Container_HouseVilla from "../../components/Beautiful_House/House_Villa/Container_HoseVilla";

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
