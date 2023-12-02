import { Form, Formik } from "formik";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import * as yup from "yup";
import Input from "../Input";
import Select from "../Select";

const AddCourses = () => {
  const [dob, setDob] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: { startDate: Date; endDate: Date }) => {
    console.log(newValue);
    setDob(newValue);
  };
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Sales Rep
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            courseCode: "",
            amount: "",
            venueLink: "",
            schedule: "",
            courseTitle: "",
            status: "active",
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Course Information
                </p>
                <Input
                  placeholder="Course Code"
                  name="courseCode"
                  value={values.courseCode}
                  onChange={handleChange}
                  type="text"
                />
                <Select
                  data={[
                    "SAT One Year Subscription",
                    "SAT Four Month Subscription",
                    "SAT Practice Test Course",
                    "TOEFL",
                    "IELTS",
                  ]}
                  name="courseTitle"
                  placeholder="Choose a Course Title"
                  value={values.courseTitle}
                  onChange={handleChange}
                />
                <p>Start Date</p>
                <div
                  className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                    false ? "border-orange-300" : "border-gray-300"
                  }`}
                >
                  <Datepicker
                    value={dob}
                    onChange={() => handleValueChange}
                    primaryColor={"orange"}
                    showShortcuts={false}
                    asSingle={true}
                    useRange={false}
                  />
                </div>
                <p>End Date</p>
                <div
                  className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                    false ? "border-orange-300" : "border-gray-300"
                  }`}
                >
                  <Datepicker
                    value={dob}
                    onChange={() => handleValueChange}
                    primaryColor={"orange"}
                    showShortcuts={false}
                    asSingle={true}
                    useRange={false}
                  />
                </div>
                <Input
                  placeholder="Course Code"
                  name="schedule"
                  value={values.schedule}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Venue Link"
                  name="venueLink"
                  value={values.venueLink}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Amount"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="text"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCourses;

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   emailAddress: yup.string().required(),
//   phoneNumber: yup.string().required(),
//   whatsappNumber: yup.string().required(),
//   gender: yup.string().required(),
//   status: yup.string().required(),
// });
