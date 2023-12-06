import axios from "axios";

export const createCourse = async (token: string, values: FormData) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/course`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getCourses = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/course/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await result;
    return data;
  } catch (error) {
    return error;
  }
};
