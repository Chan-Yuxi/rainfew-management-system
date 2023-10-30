import { Router } from "@/router";
import { connect } from "react-redux";

import { RootState } from "./store";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/test");
  }

  return (
    <>
      <a onClick={handleClick}>Go</a>
      <Router />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.system.auth,
});

export default connect(mapStateToProps)(App);
