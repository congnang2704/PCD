import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import RenovationCityHouse from "./RenovationCityHouse/RenovationCityHouse";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <RenovationCityHouse />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
