import type { LoginField, UserState } from "@/@types";
import { Card, Form, Input, Button } from "antd";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Storage from "@/utils/storage";
import { login } from "@/api/user";
import { updateUser } from "@/store/features/user";
import { setAuth } from "@/store/features/system";

type MapDispatchProps = {
  updateUser: (user: UserState) => void;
  setAuth: (auth: boolean) => void;
};

const Login: React.FC<MapDispatchProps> = (props) => {
  const { updateUser, setAuth } = props;
  const navigate = useNavigate();

  const handleLogin = (values: LoginField) => {
    login(values).then((res: any) => {
      if (res) {
        Storage.set("TOKEN", res.token as string);
        updateUser(res as UserState);
        setAuth(true);
        navigate("/");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-stone-100 relative">
      <Card title="Login">
        <Form onFinish={handleLogin}>
          <Form.Item<LoginField> name="username">
            <Input placeholder="type username" />
          </Form.Item>
          <Form.Item<LoginField> name="password">
            <Input.Password placeholder="type password" />
          </Form.Item>
          <Button htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default connect(null, { updateUser, setAuth })(Login);
