import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "../components/Input";

const Login = () => {
  return (
    <div className="min-h-screen p-8 space-y-10 flex flex-col justify-center bg-white">
      {/* <div className="text-center">
        <p className="text-4xl font-semibold">Header</p>
      </div> */}
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
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={loginValidation}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
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
                className="text-sm md:text-base block w-full bg-indigo-500 text-white py-3 rounded-full font-semibold"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

const loginValidation = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
