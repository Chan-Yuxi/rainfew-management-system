import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SystemState } from "@/@types";

import { getMenus } from "@/api/system";
import { extractDynamicRoutes } from "@/utils/system";

export const logged = createAsyncThunk("system/logged", async () => {
  const menu = await getMenus();
  return {
    dynamicRoutes: extractDynamicRoutes(menu),
    menu,
  };
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
      const { menu, dynamicRoutes } = payload;
      if (menu) {
        state.menu.length = 0;
        state.dynamicRoutes.length = 0;
        state.menu.push(...menu);
        state.dynamicRoutes.push(...dynamicRoutes);
        state.auth = true;
      }
    });
  },
});

export const { logout } = systemSlice.actions;
export default systemSlice.reducer;
