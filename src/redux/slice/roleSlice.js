import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actionsa: [],
};

export const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {
    upadateActions: (state, action) => {
      state.actionsa = action.payload;
    },
  },
});
