import Client from "@/config/Client";

export const deleteAllUser = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/user/delete`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const addUser = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/user`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const data = await Client.delete(`/api/admin/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteUsers= async (payload) => {
  try {
    const data = await Client.post(`/api/admin/delete`,payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getUserById = async (id) => {
  try {
    const data = await Client.get(`/api/admin/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id, payload) => {
  try {
    const data = await Client.post(`/api/admin/user/${id}`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
