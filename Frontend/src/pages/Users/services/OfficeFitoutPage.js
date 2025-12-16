import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import OfficeFitoutPage from "./Office_FitoutVP/OfficeFitoutPage";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <OfficeFitoutPage />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
