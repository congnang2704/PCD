import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Rough_Construction from "./Rough_ThiCongTho/Rough";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Rough_Construction />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
