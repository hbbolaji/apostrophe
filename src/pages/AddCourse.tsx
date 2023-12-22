import { Form, Formik } from "formik";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { type DateValueType } from "react-tailwindcss-datepicker/dist/types";
import * as yup from "yup";
import Input from "../components/Input";
import Select from "../components/Select";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFormData } from "../utils/helper";
import { createCourse } from "../api/course";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";

const AddCourses = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [startError, setStartError] = useState<boolean>(false);
  const [endError, setEndError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const handleStartDate = (newValue: DateValueType) => {
    setStartError(false);
    setStartDate(newValue);
  };
  const handleEndDate = (newValue: DateValueType) => {
    setEndError(false);
    setEndDate(newValue);
  };

  const handleSubmit = async (values: any) => {
    if (startDate?.startDate === null) {
      setStartError(true);
    }
    if (endDate?.startDate === null) {
      setEndError(true);
    }
    setLoading(true);
    if (startDate?.startDate !== null && endDate?.startDate !== null) {
      const formData = getFormData({
        ...values,
        startDate: startDate?.startDate || new Date().setMonth(11),
        endDate: endDate?.startDate || new Date().setMonth(12),
      });
      const result: any = await createCourse(token, formData);
      if (result?.status === 200 || result?.statusText === "OK") {
        setLoading(false);
        navigate("/dashboard/courses");
      } else {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add New Course
      </h4>
      {error ? (
        <Toast
          message="cannot add new course now"
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
            courseCode: "",
            amount: "",
            venueLink: "",
            physical: "false",
            scheduleDay: "",
            scheduleTime: "",
            scheduleDuration: "",
            courseTitle: "",
            status: "active",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
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
                      onChange={handleStartDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                  {startError ? (
                    <p className="text-xs px-5 text-red-500">
                      course start date is required
                    </p>
                  ) : null}
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
                      onChange={handleEndDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                  {endError ? (
                    <p className="text-xs px-5 text-red-500">
                      course end date is required
                    </p>
                  ) : null}
                </div>
                <Select
                  data={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
                  name="scheduleDay"
                  placeholder="Schedule Day"
                  value={values.scheduleDay}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Schedule Time"
                  name="scheduleTime"
                  value={values.scheduleTime}
                  onChange={handleChange}
                  type="time"
                />
                <Select
                  data={[
                    "1 hour",
                    "1.5 hour",
                    "2 hours",
                    "2.5 hours",
                    "3 hours",
                    "3.5 hours",
                    "4 hours",
                  ]}
                  name="scheduleDuration"
                  placeholder="Schedule Duration"
                  value={values.scheduleDuration}
                  onChange={handleChange}
                />
                <div className="px-2 flex items-center space-x-4">
                  <input
                    type="checkbox"
                    value={values.physical}
                    name="physical"
                    onChange={handleChange}
                  />
                  <label className="text-orange-500 font-semibold">
                    Class is Physical
                  </label>
                </div>
                <Input
                  placeholder="Venue Link"
                  name="venueLink"
                  value={values.venueLink}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Amount (USD)"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="text"
                />

                <div className="flex justify-end items-center space-x-4">
                  <button
                    type="submit"
                    className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                  >
                    <span>Submit</span>
                  </button>
                  {loading ? <ButtonSpinner /> : null}
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

const validationSchema = yup.object().shape({
  courseCode: yup.string().required("course code is required"),
  amount: yup.string().required("course amount is required"),
  venueLink: yup.string().required("course venue is required"),
  scheduleDay: yup.string().required("course schedule day is required"),
  scheduleTime: yup.string().required("course schedule time is required"),
  scheduleDuration: yup
    .string()
    .required("course schedule duration is required"),
  courseTitle: yup.string().required("course title is required"),
});
