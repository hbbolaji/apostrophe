import axios from "axios";

export const getDiscounts = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/discount/scheme/all`,
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
