import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input";
import Select from "../Select";

const AddSales = () => {
  return (
    <div className="space-y-8">
      <h4 className="text-orange-400 font-semibold text-center text-2xl pt-8">
        Add New Sales Rep
      </h4>
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
          <Form className="space-y-5">
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
            <Input
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSales;
