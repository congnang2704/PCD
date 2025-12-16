import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Residence_StreetHouse from "./Residence_StreetHouse_TKND/Residence_StreetHouse";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Residence_StreetHouse />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
