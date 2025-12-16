import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import FormTypeTC from "./FormTypeTC/formtyprtc";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <FormTypeTC />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
