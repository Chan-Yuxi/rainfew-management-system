import { createSlice } from "@reduxjs/toolkit";

import type { SystemState, RouteOption } from "@/@types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: SystemState = {
  auth: false,
  dynamicRoutes: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.auth = payload;
    },
    setDynamicRoutes: (state, { payload }: PayloadAction<RouteOption[]>) => {
      state.dynamicRoutes.length = 0;
      state.dynamicRoutes.push(...payload);
    },
  },
});

export const { setAuth, setDynamicRoutes } = systemSlice.actions;
export default systemSlice.reducer;
