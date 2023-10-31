import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SystemState, MenuOption } from "@/@types";
import { getMenus } from "@/api/system";

export const fetchMenu = createAsyncThunk("system/fetchMenu", async () => {
  return <Promise<MenuOption[]>>await getMenus();
});

const initialState: SystemState = {
  auth: false,
  menu: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    logged: (state) => {
      state.auth = !0;
    },
    logout: (state) => {
      state.auth = !1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, { payload }) => {
      state.menu.length = 0;
      state.menu.push(...payload);
    });
  },
});

export const { logged, logout } = systemSlice.actions;
export default systemSlice.reducer;
