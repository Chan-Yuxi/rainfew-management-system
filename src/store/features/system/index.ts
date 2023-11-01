import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SystemState, MenuOption } from "@/@types";
import { getMenus } from "@/api/system";

export const logged = createAsyncThunk("system/logged", async () => {
  return await (<Promise<MenuOption[]>>getMenus());
});

const initialState: SystemState = {
  auth: false,
  menu: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = !1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logged.fulfilled, (state, { payload }) => {
      state.menu.length = 0;
      state.menu.push(...payload);
      state.auth = !0;
    });
  },
});

export const { logout } = systemSlice.actions;
export default systemSlice.reducer;
