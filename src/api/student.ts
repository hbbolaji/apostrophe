import axios from "axios";

export const getStudents = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/student/all`,
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

export const getStudentsBySales = async (token: string, salesId: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/student/all/${salesId}`,
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

export const getStudetnById = async (token: string, id: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/student/${id}`,
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

export const editStudent = async (
  token: string,
  studentId: string,
  values: FormData
) => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/student/${studentId}`,
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

export const createStudent = async (token: string, values: FormData) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/student`,
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
