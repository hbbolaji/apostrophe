import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input";
import Select from "../Select";

const AddSales = () => {
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
            email: "",
            phoneNumber: "",
            whatsappNumber: "",
            gender: "",
            status: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col lg:flex-row space-y-5 lg:space-y-0  lg:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg lg:flex-1 space-y-5">
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
                  data={["active", "inactive"]}
                  name="status"
                  placeholder="Status"
                  value={values.status}
                  onChange={handleChange}
                />
              </div>
              <div className="p-5 bg-white rounded-lg shadow-lg lg:flex-1 space-y-5">
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
                <button
                  type="submit"
                  className="text-sm md:text-base block w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSales;
