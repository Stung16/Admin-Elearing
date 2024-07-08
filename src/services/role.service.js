import Client from "@/config/Client";

export const addRole = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/role`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getRoleItance = async (id) => {
  try {
    const data = await Client.get(`/api/admin/role/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllModel = async () => {
  try {
    const data = await Client.get(`/api/admin/model`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const IsPermission = (permissions, value) => {
  return permissions?.find((permission) => {
    return permission?.value === value;
  });
};
export const deleRole = async (id) => {
  try {
    const data = await Client.delete(`/api/admin/role/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export function IncludeArr(arr) {
  // Sử dụng Set để loại bỏ các giá trị trùng lặp
  return [...new Set(arr)];
}
export const addPermisiion = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/permission`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export function isCan(arr, phanTu) {
  return arr.includes(phanTu);
}
export const HandleEditRole = async (id, payload) => {
  try {
    const data = await Client.post(`/api/admin/role/${id}`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
