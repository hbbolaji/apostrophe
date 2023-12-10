import axios from "axios";

export const getGuardians = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/all`,
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

export const getGuardian = async (token: string, id: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${id}`,
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

export const createGuardian = async (
  token: string,
  studentId: string,
  values: FormData
) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${studentId}`,
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

export const updateGuardian = async (
  token: string,
  guardianId: string,
  values: FormData
) => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${guardianId}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
    // navigate(`/dashboard/students/${state.studentId}`);
  } catch (error) {
    return error;
  }
};
