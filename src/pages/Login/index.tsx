import { Card, Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginField, UserState } from "@/@types";
import { Constant } from "@/@types/enum";
import { login } from "@/api/user";
import { recordUser } from "@/store/features/user";
import { logged } from "@/store/features/system";

type MapDispatchProps = {
  recordUser: (user: UserState) => void;
  logged: () => void;
};

const Login: React.FC<MapDispatchProps> = ({ recordUser, logged }) => {
  const navigate = useNavigate();

  const handleLogin = (values: LoginField) => {
    login(values).then((user) => {
      if (user) {
        recordUser(user);
        // change the system slice in redux to trigger updates to the Router component
        // thereby dynamically loading the route
        logged();
        setTimeout(() => navigate(Constant.INDEX_PATH), 100);
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-stone-100 relative">
      <div className="login-ball-deco ball-1"></div>
      <div className="login-ball-deco ball-2"></div>

      <Card title="Login">
        <Form onFinish={handleLogin}>
          <Form.Item<LoginField> name="username">
            <Input placeholder="type username" />
          </Form.Item>
          <Form.Item<LoginField> name="password">
            <Input.Password placeholder="type password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default connect(null, { recordUser, logged })(Login);
