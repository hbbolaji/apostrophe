import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "../Input";
import Select from "../Select";
import { getFormData } from "../../utils/helper";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddSales = () => {
  const [step, setStep] = useState(0);
  const { token } = useAuth();
  const navigate = useNavigate();

  const createSales = async (values: FormData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/dashboard/sales");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Sales Rep
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            whatsappNumber: "",
            contactNumber: "",
            gender: "",
            status: "active",
            generatedPassword: "",
            role: "sales",
            spokenLanguage: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const formData = getFormData(values);
            createSales(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              {step === 0 ? (
                <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                  <p className="font-semibold text-gray-500">
                    Personal Information
                  </p>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    type="text"
                  />
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    type="text"
                  />
                  <Select
                    data={["male", "female"]}
                    name="gender"
                    placeholder="Choose a gender"
                    value={values.gender}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Password"
                    name="generatedPassword"
                    value={values.generatedPassword}
                    onChange={handleChange}
                    type="password"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
              {step === 1 ? (
                <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                  <p className="font-semibold text-gray-500">
                    Contact Information
                  </p>
                  <Input
                    placeholder="Email Address"
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleChange}
                    type="email"
                  />
                  <Input
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    type="text"
                  />
                  <Input
                    placeholder="Contact Number"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    type="text"
                  />
                  <Input
                    placeholder="WhatsApp Number"
                    name="whatsappNumber"
                    value={values.whatsappNumber}
                    onChange={handleChange}
                    type="text"
                  />
                  <Select
                    data={["Turkish", "English", "Arabic"]}
                    name="spokenLanguage"
                    placeholder="Spoken Language"
                    value={values.spokenLanguage}
                    onChange={handleChange}
                  />
                  <div className="flex space-x-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSales;

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  emailAddress: yup.string().required(),
  phoneNumber: yup.string().required(),
  whatsappNumber: yup.string().required(),
  gender: yup.string().required(),
  status: yup.string().required(),
});
