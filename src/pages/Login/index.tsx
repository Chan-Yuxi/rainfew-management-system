import { useDispatch } from "react-redux";
import { setAuth, setDynamicRoutes } from "@/store/features/system";

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = function () {
    dispatch(
      setDynamicRoutes([
        {
          path: "/test",
          elementPath: "TestDynamicRoute/index",
          children: [],
        },
      ])
    );
    dispatch(setAuth(true));
  };

  return (
    <div>
      <div>
        <input type="text" />
        <input type="password" />
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Login;
