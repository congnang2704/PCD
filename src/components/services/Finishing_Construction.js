import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../components/header/header_home";
import FooterHome from "../../components/footer/footer_home";
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
