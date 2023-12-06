import axios from "axios";
import { LoginType } from "../utils/types";

export const LoginHandler = async (values: LoginType) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      values
    );
    const { data } = result;
    if (data.success) {
      sessionStorage.setItem("token", data.token);
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    return error;
  }
};
