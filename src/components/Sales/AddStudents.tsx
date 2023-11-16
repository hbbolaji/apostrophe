import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input";
import Select from "../Select";

const AddStudents = () => {
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Students
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            phoneNumber: "",
            spokenLanguage: "",
            whatsappNumber: "",
            gender: "",
            status: "",
            nationality: "",
            residence: "",
            placementTest: "",
            academicStatus: "",
            financialStatus: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg xl:flex-1 space-y-5">
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
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  value={values.dateOfBirth}
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
              </div>
              <div className="p-5 bg-white rounded-lg shadow-lg xl:flex-1 space-y-5">
                <p className="font-semibold text-gray-500">
                  Contact Information
                </p>
                <Input
                  placeholder="Email Address"
                  name="email"
                  value={values.email}
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
                  placeholder="WhatsApp Number"
                  name="whatsappNumber"
                  value={values.whatsappNumber}
                  onChange={handleChange}
                  type="text"
                />
                <Select
                  data={["Turkish", "English", "Arabic"]}
                  name="residence"
                  placeholder="Residence"
                  value={values.residence}
                  onChange={handleChange}
                />
                <Select
                  data={["Turkish", "English", "Arabic"]}
                  name="nationality"
                  placeholder="Nationality"
                  value={values.nationality}
                  onChange={handleChange}
                />
              </div>
              <div className="p-5 bg-white rounded-lg shadow-lg xl:flex-1 space-y-5">
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
                <Select
                  data={["Turkish", "English", "Arabic"]}
                  name="academicStatus"
                  placeholder="Academic Status"
                  value={values.academicStatus}
                  onChange={handleChange}
                />
                <Select
                  data={["Turkish", "English", "Arabic"]}
                  name="financialStatus"
                  placeholder="Financial Status"
                  value={values.financialStatus}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="text-sm md:text-base block w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
                >
                  Submit
                </button>{" "}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStudents;
