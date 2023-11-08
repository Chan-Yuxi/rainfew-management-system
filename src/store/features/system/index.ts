import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SystemState } from "@/@types";
import { getMenus } from "@/api/system";

import SystemUtils from "@/utils/system";

export const logged = createAsyncThunk("system/logged", async () => {
  const menuOptions = await getMenus();
  if (menuOptions) {
    return SystemUtils.resolveMenuOption(menuOptions);
  }
});

const initialState: SystemState = {
  auth: false,
  menu: [],
  dynamicRoutes: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    logout: (state) => {
      state.menu.length = 0;
      state.dynamicRoutes.length = 0;
      state.auth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logged.fulfilled, (state, { payload }) => {
      if (payload) {
        const [dynamicRoutes, menu] = payload;
        state.dynamicRoutes.length = 0;
        state.dynamicRoutes = dynamicRoutes;
        state.menu.length = 0;
        state.menu = menu;
        state.auth = true;
      }
    });
  },
});

export const { logout } = systemSlice.actions;
export default systemSlice.reducer;
