import { useEffect } from "react";
import { connect } from "react-redux";

import { Router } from "@/router";
import { RootState } from "@/store";
import { setMenus } from "@/store/features/system";
import { getMenus } from "@/api/system";
import { MenuOption } from "./@types";

type MapStateProps = {
  auth: boolean;
};
type DispatchProps = {
  setMenus: (menus: MenuOption[]) => void;
};

const App: React.FC<MapStateProps & DispatchProps> = (props) => {
  const { auth, setMenus } = props;

  useEffect(() => {
    getMenus().then((res: any) => setMenus(res as MenuOption[]));
  }, [auth, setMenus]);

  return <Router />;
};

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.system.auth,
  };
};
const mapDispatchToProps = {
  setMenus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
