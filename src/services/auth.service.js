import Client from "@/config/Client";

export const Handlelogout = async () => {
  try {
    const res = await Client.post(`/api/admin/auth/logout`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const login = async (payload) => {
  try {
    const res = await Client.post(`/api/admin/auth/login`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const verifycode = async (payload) => {
  try {
    const res = await Client.post(`/api/admin/auth/verify`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const refeshToken = async (payload) => {
  try {
    const res = await Client.post(`/api/admin/auth/refeshtoken`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const reCode = async (payload) => {
  try {
    const res = await Client.post(`/api/admin/auth/recode`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = async () => {
  try {
    const res = await Client.get(`/api/client/auth/profile`);
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
