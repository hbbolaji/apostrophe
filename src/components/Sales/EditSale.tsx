import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "../Input";
import Select from "../Select";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormData } from "../../utils/helper";

const EditSales = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();

  const editSales = async (values: FormData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/dashboard/me");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Sales Profile
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            emailAddress: currentUser.emailAddress || "",
            phoneNumber: currentUser.phoneNumber || "",
            whatsappNumber: currentUser.whatsappNumber || "",
            contactNumber: currentUser.contactNumber || "",
            gender: currentUser.gender || "",
            status: currentUser.status || "",
            role: currentUser.role || "",
            spokenLanguage: currentUser.spokenLanguage || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const formData = getFormData(values);
            editSales(formData);
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
                  <Select
                    data={["Turkish", "English", "Arabic"]}
                    name="spokenLanguage"
                    placeholder="Spoken Language"
                    value={values.spokenLanguage}
                    onChange={handleChange}
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
                    name="email"
                    value={values.emailAddress}
                    onChange={handleChange}
                    type="email"
                    disabled={true}
                  />
                  <Input
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
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
                  <Input
                    placeholder="Contact Number"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    type="text"
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

export default EditSales;

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  emailAddress: yup.string().required(),
  phoneNumber: yup.string().required(),
  whatsappNumber: yup.string().required(),
  gender: yup.string().required(),
  status: yup.string().required(),
});
