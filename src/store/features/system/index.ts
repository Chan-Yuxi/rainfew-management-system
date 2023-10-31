import { createSlice } from "@reduxjs/toolkit";

import type { SystemState, RouteOption, MenuOption } from "@/@types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: SystemState = {
  auth: false,
  menus: [],
  dynamicRoutes: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.auth = payload;
    },
    setMenus: (state, { payload }: PayloadAction<MenuOption[]>) => {
      state.menus.length = 0;
      state.menus.push(...payload);
    },
    setDynamicRoutes: (state, { payload }: PayloadAction<RouteOption[]>) => {
      state.dynamicRoutes.length = 0;
      state.dynamicRoutes.push(...payload);
    },
  },
});

export const { setAuth, setMenus, setDynamicRoutes } = systemSlice.actions;
export default systemSlice.reducer;
