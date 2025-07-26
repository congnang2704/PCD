import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
import WarrantyPolicy from "./Warranty/Container_Warranty";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>{/* <WarrantyPolicy /> */}</Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
