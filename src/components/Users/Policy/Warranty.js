import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import WarrantyPolicy from "../Policy/Warranty/Container_Warranty";

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
