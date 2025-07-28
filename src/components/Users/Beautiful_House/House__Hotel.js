import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_HouseHotel from "./House__Hotel/Container_HouseHotel";

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
