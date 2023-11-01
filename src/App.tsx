import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/store";
import { Router } from "@/router";

type P = {
  auth: RootState["system"]["auth"];
};

const App: React.FC<P> = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return <Router />;
};

const mapStateToProps = (state: RootState) => ({
  auth: state.system.auth,
});

export default connect(mapStateToProps)(App);
