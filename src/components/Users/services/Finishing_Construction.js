import React from "react";
import { Layout } from "antd";
import HeaderHome from "../header/header_home";
import FooterHome from "../footer/footer_home";
import Finishing_Constructions from "./Finishing_Construction/Finishing_Constructions";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Finishing_Constructions />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
