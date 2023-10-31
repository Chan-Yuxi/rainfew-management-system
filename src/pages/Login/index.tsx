import { Card, Form, Input, Button } from "antd";
import { connect } from "react-redux";

import { LoginField, UserState } from "@/@types";
import { login } from "@/api/user";
import { updateUser } from "@/store/features/user";
import { logged, fetchMenu } from "@/store/features/system";

type MapDispatchProps = {
  updateUser: (user: UserState) => void;
  logged: () => void;
  fetchMenu: () => void;
};

const Login: React.FC<MapDispatchProps> = (props) => {
  const { updateUser, logged, fetchMenu } = props;

  const handleLogin = (values: LoginField) => {
    login(values).then((res: any) => {
      if (res) {
        updateUser(res as UserState);
        logged();
        fetchMenu();
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

export default connect(null, { updateUser, logged, fetchMenu })(Login);
