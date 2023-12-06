import axios from "axios";

export const getPlans = async (token: string) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/all`,
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

export const updatePaymentPlan = async (
  token: string,
  id: string,
  values: FormData
) => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/${id}`,
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
