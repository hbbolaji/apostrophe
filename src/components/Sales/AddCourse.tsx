import { Form, Formik } from "formik";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import * as yup from "yup";
import Input from "../Input";
import Select from "../Select";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFormData } from "../../utils/helper";

const AddCourses = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [startDate, setStartDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [endDate, setEndDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleStartDate = (newValue: { startDate: Date; endDate: Date }) => {
    console.log(newValue);
    setStartDate(newValue);
  };
  const handleEndDate = (newValue: { startDate: Date; endDate: Date }) => {
    console.log(newValue);
    setEndDate(newValue);
  };

  const createCourse = async (values: FormData) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/course`,
        values,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      // navigate("/dashboard/courses");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Course
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
            const formData = getFormData({
              ...values,
              startDate: startDate.startDate,
              endDate: endDate.startDate,
            });
            createCourse(formData);
            console.log({
              ...values,
              startDate: new Date(2023 - 10 - 10),
              endDate: 2024 - 11 - 20,
            });
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
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">
                    Start Date
                  </p>
                  <div
                    className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                      false ? "border-orange-300" : "border-gray-300"
                    }`}
                  >
                    <Datepicker
                      value={startDate}
                      onChange={() => handleStartDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">
                    End Date
                  </p>
                  <div
                    className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                      false ? "border-orange-300" : "border-gray-300"
                    }`}
                  >
                    <Datepicker
                      value={endDate}
                      onChange={() => handleEndDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                </div>
                <Input
                  placeholder="Schedule"
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
