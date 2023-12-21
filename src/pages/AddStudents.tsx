import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import Input from "../components/Input";
import Select from "../components/Select";
import countries from "../utils/countries.json";
import { getFormData } from "../utils/helper";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../api/student";
import Toast from "../components/Toast";
import ButtonSpinner from "../components/ButtonSpinner";

const AddStudents = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dob, setDob] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const countriesData = countries.map((count) => count.country);

  const handleValueChange = (newValue: DateValueType) => {
    setDob(newValue);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = getFormData({
      ...values,
      dateOfBirth: dob?.startDate || "",
    });
    const result: any = await createStudent(token, formData);
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);
      navigate(`/dashboard/me`);
    } else {
      setErrorMsg("Unable to add student at the moment ");
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Students
      </h4>
      {error ? (
        <Toast
          message={errorMsg}
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
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            spokenLanguage: "",
            whatsappNumber: "",
            contactNumber: "",
            gender: "",
            nationality: "",
            residence: "",
            placementTest: "",
            academicStatus: "Awaiting Course Registration",
            financialStatus: "No Payment",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="block w-full">
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
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm px-2 text-gray-600">
                      Date of Birth
                    </p>
                    <div
                      className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                        false ? "border-orange-300" : "border-gray-300"
                      }`}
                    >
                      <Datepicker
                        value={dob}
                        onChange={handleValueChange}
                        primaryColor={"orange"}
                        showShortcuts={false}
                        asSingle={true}
                        useRange={false}
                      />
                    </div>
                  </div>
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
                    data={countriesData}
                    name="residence"
                    placeholder="Residence"
                    value={values.residence}
                    onChange={handleChange}
                  />
                  <Select
                    data={countriesData}
                    name="nationality"
                    placeholder="Nationality"
                    value={values.nationality}
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
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
              {step === 2 ? (
                <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                  <p className="font-semibold text-gray-500">
                    Admission Information
                  </p>
                  <Input
                    placeholder="Placement Test"
                    name="placementTest"
                    value={values.placementTest}
                    onChange={handleChange}
                    type="number"
                  />
                  <div className="flex space-x-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
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

export default AddStudents;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  emailAddress: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  spokenLanguage: yup.string().required("Spoken Language is required"),
  whatsappNumber: yup.string().required("Whatsapp Number is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  gender: yup.string().required("Gender is required"),
  nationality: yup.string().required("Nationality is required"),
  residence: yup.string().required("Residence is required"),
  placementTest: yup.string().required("Placement Test is required"),
});
