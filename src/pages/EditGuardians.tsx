import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import countries from "../utils/countries.json";
import { useLocation, useNavigate } from "react-router-dom";
import { getFormData } from "../utils/helper";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EditGuardian = () => {
  const [step, setStep] = useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!state) {
      navigate("/dashboard/me");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateGuardian = async (values: FormData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${state.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/students/${state.studentId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const countriesData = countries.map((count) => count.country);
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Student Guardian Info
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: state.firstName || "",
            lastName: state.lastName || "",
            emailAddress: state.emailAddress,
            phoneNumber: state.phoneNumber || "",
            whatsappNumber: state.whatsappNumber || "",
            contactNumber: state.contactNumber || "",
            gender: state.gender || "",
            nationality: state.nationality || "",
            residence: state.residence || "",
            relationshipStudent: state.relationshipStudent,
          }}
          onSubmit={(values) => {
            const formData = getFormData(values);
            updateGuardian(formData);
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

export default EditGuardian;
