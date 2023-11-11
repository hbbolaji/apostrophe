import React, { useEffect, useState } from "react";
import { PiPlusLight } from "react-icons/pi";
// import Rightbar from "../components/Rightbar";
// import AddSales from "../components/Sales/AddSales";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import Student from "../components/Student";
import { studentsData } from "../utils/data";
import { StudentType } from "../utils/types";

const Students = () => {
  const [students, setStudents] = useState([]);

  const onSearch = (value: string) => {
    if (value === "") setStudents(studentsData as []);
    else
      setStudents(
        students.filter(
          (user: StudentType) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
  };

  useEffect(() => {
    setStudents(studentsData as []);
  }, []);
  return (
    <div className="flex space-between w-full">
      <div className="flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Students</p>
          <PiPlusLight className="text-2xl" />
        </div>
        {/* search function */}
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            onSearch(values.search);
          }}
        >
          {({ values, handleChange, setValues }) => (
            <Form className="flex space-x-4 items-center">
              <div className="flex-1 w-full">
                <Input
                  name="search"
                  placeholder="Search..."
                  hidelabel={true}
                  type="text"
                  value={values.search}
                  onChange={handleChange}
                  close={() => {
                    setValues({ search: "" });
                    setStudents(studentsData as []);
                  }}
                />
              </div>
              <button
                type="submit"
                className="text-sm md:text-base block px-10 bg-orange-500 text-white py-4 rounded-full font-semibold"
              >
                Search
              </button>
            </Form>
          )}
        </Formik>
        {/* List of users */}
        <div className="flex flex-wrap">
          {students.map((student: StudentType) => (
            <div
              key={student.uid}
              className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-3"
            >
              <Student student={student} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        {/* large monitor view */}
        {/* <Rightbar>
          <AddSales />
        </Rightbar> */}
      </div>
    </div>
  );
};

export default Students;
