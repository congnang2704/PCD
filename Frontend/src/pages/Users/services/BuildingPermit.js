import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import BuildingPermitService from "./BuildingPermit/BuildingPermitService";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <BuildingPermitService />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
