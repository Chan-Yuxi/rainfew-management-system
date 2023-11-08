import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { logout } from "@/store/features/system";
import { connect } from "react-redux";

type P = {
  logout: () => void;
};

const Profile: React.FC<P> = ({ logout }) => {
  const navigate = useNavigate();
  function handleClick() {
    logout();
    navigate("/login");
  }

  return (
    <div className="w-60">
      <Button onClick={handleClick} type="primary" danger block>
        Logout
      </Button>
    </div>
  );
};

export default connect(null, {
  logout,
})(Profile);
