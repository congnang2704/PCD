import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import Villa_Construction from "./Villa_Construction_TCBT/VillaConstruction";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <Villa_Construction />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
