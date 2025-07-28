import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Container_Contacts from "./Container_Contacts";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Container_Contacts />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
