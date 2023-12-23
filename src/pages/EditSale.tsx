import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "../components/Input";
import Select from "../components/Select";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFormData } from "../utils/helper";
import { editSales } from "../api/sales";
import Toast from "../components/Toast";
import ButtonSpinner from "../components/ButtonSpinner";

const EditSales = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();

  const handleSubmt = async (values: any) => {
    setLoading(true);
    const formData = getFormData(values);
    const result: any = await editSales(token, formData);
    if (result?.status === 201 || result?.statusText === "OK") {
      setLoading(false);
      navigate("/dashboard/me");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Sales Profile
      </h4>
      {error ? (
        <Toast
          message="cannot edit sales agent now"
          close={() => {
            setError(false);
          }}
          show={error}
          type="error"
        />
      ) : null}
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
            handleSubmt(values);
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
                    name="emailAddress"
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
                    {loading ? <ButtonSpinner /> : null}
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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup.string().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  whatsappNumber: yup.string().required("Whatsapp number is required"),
  gender: yup.string().required("Gender is required"),
  status: yup.string(),
});
