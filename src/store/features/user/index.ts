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
    updateUser: (state, { payload }: PayloadAction<UserState>) => {
      Object.assign(state, payload);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
