import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import Container_HouseHotel from "../../components/Beautiful_House/House__Hotel/Container_HouseHotel";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_HouseHotel />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
