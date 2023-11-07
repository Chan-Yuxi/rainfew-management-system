import React from "react";
import Logo from "./components/Logo";
import { Layout, Menu, MenuProps } from "antd";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { RootState } from "@/store";
import { MenuOption } from "@/@types";

const { Header, Content, Sider } = Layout;

const RainfewLayout: React.FC<P> = ({ menu }) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    const path = "/" + event.keyPath.reduceRight((p, c) => `${p}/${c}`);
    navigate(path);
  };

  return (
    <Layout className="h-screen">
      <Header className="flex">
        <Logo />
      </Header>
      <Layout>
        <Sider width={250}>
          <Menu
            onClick={handleMenuClick}
            className="h-full bg-white"
            mode="inline"
            items={menu}
          />
        </Sider>
        <Layout className="p-6">
          <Content className="p-6 bg-white rounded">
            {/* entry to pages */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProp = (state: RootState) => ({
  menu: state.system.menu,
});
type P = {
  menu: MenuOption[];
};

export default connect(mapStateToProp)(RainfewLayout);
