import React from "react";

import type { RootState } from "@/store";
import type { UserState } from "@/@types";

import { Space, Popover, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
// import { logout } from "@/store/features/system";
import { useNavigate } from "react-router-dom";

const Profile: React.FC<P> = ({ user /*, logout */ }) => {
  const navigate = useNavigate();
  const { nickname, email, status, /* description, */ roles } = user;

  function doLogout() {
    // logout();
    navigate("/login");
  }

  const Details = (
    <Space className="w-60" direction="vertical">
      <Space>
        <Avatar className="m-3" size={64} icon={<UserOutlined />} />
        <div className="flex flex-col">
          <span className="font-bold">{nickname}</span>
          <span className="text-slate-500">{email}</span>
          <span className="font-bold text-green-600">{status}</span>
        </div>
      </Space>
      <Space>
        {roles.map((role, index) => {
          return (
            <span key={index} className="bg-slate-100 rounded px-2 py-0.5">
              {role}
            </span>
          );
        })}
      </Space>
      {/* <Select /> */}
      <Button onClick={doLogout} type="primary" danger block>
        Logout
      </Button>
    </Space>
  );

  return (
    <Space>
      <span className="text-white font-bold me-2">{nickname}</span>
      <Popover placement="leftBottom" content={Details} trigger="hover">
        <Avatar size={32} icon={<UserOutlined />} />
      </Popover>
    </Space>
  );
};

const mapStateToProp = (state: RootState) => ({
  user: state.user,
});
// const mapDispatchToProp = {
//   logout,
// };
type P = {
  user: UserState;
  //   logout: typeof logout;
};

export default connect(mapStateToProp)(Profile);
