import axios from "axios";

export const getSales = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/user/all`,
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

export const createSales = async (token: string, values: FormData) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
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

export const editSales = async (token: string, values: FormData) => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/user`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
    // navigate("/dashboard/me");
  } catch (error) {
    return error;
  }
};
