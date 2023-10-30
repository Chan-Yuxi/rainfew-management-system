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
        <div className="text-white bg-sky-600">Tailwind has imported</div>
        <input type="text" />
        <input type="password" />
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Login;
