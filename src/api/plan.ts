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

export const createPaymentPlan = async (
  token: string,
  values: any,
  discountSchemeId: string
) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/${discountSchemeId}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const updatePaymentPlan = async (
  token: string,
  id: string,
  values: any
) => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
