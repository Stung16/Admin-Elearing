import Client from "@/config/Client";

export const getAllCourses = async () => {
  try {
    const data = await Client.get(`/api/admin/courses`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deletCourse = async (id) => {
  try {
    const data = await Client.delete(`/api/admin/courses/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCourses = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/courses/delete`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addLession = async (payload) => {
  try {
    const data = await Client.post(`/api/admin/lession`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editLession = async (payload, id) => {
  try {
    const data = await Client.post(`/api/admin/courses/edit/${id}`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
