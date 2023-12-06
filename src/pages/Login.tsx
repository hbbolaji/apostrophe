import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "../components/Input";
import Logo from "../images/apostrophe.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import { LoginType } from "../utils/types";
import { LoginHandler } from "../api/auth";
import ButtonSpinner from "../components/ButtonSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { sendToken, token } = useAuth();
  const [error, setError] = useState<boolean>(false);

  // functions
  const onLogin = async (values: any) => {
    setLoading(true);
    const result: any = await LoginHandler(values);
    if (result.token) {
      sendToken(result.token);
      setLoading(false);
      navigate("/dashboard", { replace: true });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  if (token !== "") {
    navigate("/dashboard/sales", { replace: true });
  }

  return (
    <div className="relative min-h-screen p-8 space-y-10 flex flex-col justify-center bg-white">
      {error ? (
        <Toast
          type="error"
          show={error}
          message="Wrong Credentials!"
          close={() => setError(false)}
        />
      ) : null}
      <div className="w-full">
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
            emailAddress: "",
            generatedPassword: "",
          }}
          onSubmit={(values: LoginType) => {
            onLogin(values);
          }}
          validationSchema={loginValidation}
        >
          {({ values, handleChange }) => (
            <Form className="space-y-4">
              <Input
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleChange}
                type="email"
                placeholder="Email"
              />

              <Input
                name="generatedPassword"
                value={values.generatedPassword}
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-sm md:text-base block w-full bg-orange-500 text-white py-2 rounded-full font-semibold"
                >
                  Login
                </button>
                {loading && <ButtonSpinner />}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

const loginValidation = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
  generatedPassword: yup.string().required("Password is required"),
});
