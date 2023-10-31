import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserState } from "@/@types";

const initialState: UserState = {
  username: "",
  nickname: "",
  token: "",
  permissions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
