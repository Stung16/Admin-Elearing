import { configureStore } from "@reduxjs/toolkit";
import { helpSlice } from "./slice/helpSlice";
import { usersSlice } from "./slice/usersSlice";
import { roleSlice } from "./slice/roleSlice";

export const store = configureStore({
  reducer: {
    helperData: helpSlice.reducer,
    usersData: usersSlice.reducer,
    roleData: roleSlice.reducer,
  },
});
