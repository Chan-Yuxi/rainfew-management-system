import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user";
import systemReducer from "./features/system";

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
