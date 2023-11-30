import type { MenuProps } from "antd";
import type { RootState } from "@/store";
import type { UserState } from "@/@types";

import React, { useState } from "react";

import Logo from "./components/Logo";
import Profile from "./components/Profile";

import { Layout, Menu, Breadcrumb } from "antd";

import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const RainfewLayout: React.FC<P> = ({ menu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectKeys, setSelectKeys] = useState(["/home"]);
  const [breadItems, setBreadItems] = useState([{ title: "home" }]);

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    const { keyPath } = event;
    const path = keyPath.reduceRight(
      (p, c) => p + (c.startsWith("/") ? c : "/" + c)
    );

    if (path !== location.pathname) {
      setSelectKeys(keyPath);
      setBreadItems(
        keyPath.reverse().map((p) => ({
          title: p.startsWith("/") ? p.substring(1) : p,
        }))
      );
      navigate(path);
    }
  };

  return (
    <Layout className="h-screen">
      <Header className="flex items-center px-7">
        <Logo />
        <div className="ms-auto">
          <Profile />
        </div>
      </Header>
      <Layout>
        <Sider width={250}>
          <Menu
            selectedKeys={selectKeys}
            onClick={handleMenuClick}
            className="h-full bg-white"
            mode="inline"
            items={menu}
          />
        </Sider>
        <Layout className="px-4">
          <div className="bg-white rounded px-6 py-2 my-4">
            <Breadcrumb items={breadItems} />
          </div>
          <Content className="bg-white rounded p-6 mb-4">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProp = (state: RootState) => ({
  menu: state.system.menu,
  user: state.user,
});
type P = {
  menu: MenuProps["items"];
  user: UserState;
};

export default connect(mapStateToProp)(RainfewLayout);
