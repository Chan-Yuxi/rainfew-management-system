import { connect } from "react-redux";
import { RootState } from "@/store";
import { Router } from "@/router";

type P = {
  menu: RootState["system"]["menu"];
};

const App: React.FC<P> = ({ menu }) => {
  console.log('rerender', menu)
  return <Router menu={menu}/>;
};

export default connect((state: RootState) => ({
  menu: state.system.menu,
}))(App);
