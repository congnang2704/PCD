import React from "react";
import { Layout } from "antd";
import HeaderHome from "../../../components/header/header_home";
import FooterHome from "../../../components/footer/footer_home";
import NV_KinhTe_XD from "./NV_KienTrucSu/KienTrucSu";

const { Content } = Layout;

const HomePages = () => {
  return (
    <Layout>
      <HeaderHome />
      <Content>
        <NV_KinhTe_XD />
      </Content>
      <FooterHome />
    </Layout>
  );
};

export default HomePages;
