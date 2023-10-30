import { RootState } from "./store";
import { connect } from "react-redux";

import { Router } from "@/router";

import "@/App.css";

const mapStateToProps = (state: RootState) => ({
  auth: state.system.auth,
});

const App = () => {
  return <Router />;
};

export default connect(mapStateToProps)(App);
