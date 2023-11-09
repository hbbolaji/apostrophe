import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Input from "../components/Input";
import Logo from "../images/apostrophe.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

type LoginType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { sendToken, token } = useAuth();

  // functions
  const login = async (values: LoginType) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        {
          emailAddress: values.email,
          generatedPassword: values.password,
        }
      );
      const { data } = result;
      if (data.success) {
        sessionStorage.setItem("token", data.token);
        sendToken(data.token);
        navigate("/dashboard/sales", { replace: true });
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(data.status);
  };

  if (token !== "") {
    navigate("/dashboard/sales", { replace: true });
  }

  return (
    <>
      <Toast message="Succesfully Logged in" />
      <div className="relative min-h-screen p-8 space-y-10 flex flex-col justify-center bg-white">
        <div className="w-ful">
          <img
            className="h-12 block mx-auto cursor-pointer"
            src={Logo}
            alt="logo"
          />
        </div>
        <div className="space-y-5 justify-center w-full sm:w-4/6 md:w-1/2 lg:w-1/3 mx-auto">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Login</h2>
            <p className="text-sm text-gray-500">Welcome back</p>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values: LoginType) => {
              login({ email: values.email, password: values.password });
            }}
            validationSchema={loginValidation}
          >
            {({ values, handleChange }) => (
              <Form className="space-y-4">
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                />

                <Input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="text-sm md:text-base block w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;

const loginValidation = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
