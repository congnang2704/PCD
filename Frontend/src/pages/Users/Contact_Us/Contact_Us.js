import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import ContactUsForm from "../../../components/Mail/Contact_Us/Contact_Us";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <ContactUsForm />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
