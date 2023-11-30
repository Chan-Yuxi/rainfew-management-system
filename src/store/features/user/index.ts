import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserState } from "@/@types";

const initialState: UserState = {
  username: "",
  nickname: "",
  email: "",
  status: "",
  description: "",
  token: "",
  roles: [],
  permissions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    recordUser: (state, { payload }: PayloadAction<UserState>) => {
      Object.assign(state, payload);
    },
  },
});

export const { recordUser } = userSlice.actions;
export default userSlice.reducer;
