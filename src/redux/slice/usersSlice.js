import { createSlice } from "@reduxjs/toolkit";
import {
  requestLogin,
  requestVerify,
  requestGetUserFromToken,
} from "../middlewares/auth.middleware";

const initialState = {
  users: [],
  loading: false,
  email: undefined,
  profile: null,
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    upadateUsers: (state, action) => {
      state.users = action.payload;
    },
    upadateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },

    upadateEmail: (state, action) => {
      state.email = action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(requestGetUserFromToken.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(requestGetUserFromToken.rejected, (state) => {
        state.loading = true;
      });
    },
  },
});
