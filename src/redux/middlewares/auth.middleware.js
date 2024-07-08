import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  Handlelogout,
  verifycode,
  getProfile,
} from "@/services/auth.service";

export const requestLogin = createAsyncThunk(
  "/api/admin/auth/login",
  async (payload) => {
    return await login(payload);
  }
);
export const requestVerify = createAsyncThunk(
  "/api/admin/auth/verify",
  async (payload) => {
    return await verifycode(payload);
  }
);

export const requestLogout = createAsyncThunk(
  "/api/admin/auth/logout",
  async (payload) => {
    return await Handlelogout(payload);
  }
);
export const requestGetUserFromToken = createAsyncThunk(
  "auth/getUserFromToken",
  async () => {
    return await getProfile();
  }
);
