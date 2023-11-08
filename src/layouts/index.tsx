import type { MenuProps } from "antd";
import type { RootState } from "@/store";
import type { UserState } from "@/@types";

import React, { useState } from "react";

import Logo from "./components/Logo";
import Profile from "./components/Profile";

import { Layout, Menu, Space, Avatar, Breadcrumb, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const items = [
  {
    title: "Home",
  },
  {
    title: <a href="">Application Center</a>,
  },
  {
    title: <a href="">Application List</a>,
  },
  {
    title: "An Application",
  },
];

const RainfewLayout: React.FC<P> = ({ menu, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectKeys, setSelectKeys] = useState(["/home"]);

  const { nickname } = user;

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    const { keyPath } = event;
    const path = keyPath.reduceRight((p, c) => p + c);

    if (path !== location.pathname) {
      setSelectKeys(keyPath);
      navigate(path);
    }
  };

  return (
    <Layout className="h-screen">
      <Header className="flex items-center px-7">
        <Logo />
        <Space size={16} className="ms-auto">
          <span className="text-white font-bold">{nickname}</span>
          {/* <Popover placement="leftBottom" content={<Profile />}> */}
          <Avatar size={32} icon={<UserOutlined />} />
          {/* </Popover> */}
        </Space>
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
            <Breadcrumb items={items} />
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
