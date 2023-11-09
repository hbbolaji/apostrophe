import React from "react";
import { PiPlusLight } from "react-icons/pi";
// import Rightbar from "../components/Rightbar";
// import AddSales from "../components/Sales/AddSales";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import User from "../components/User";

const Sales = () => {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15];
  return (
    <div className="flex space-between w-full">
      <div className="flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Sales Rep</p>
          <PiPlusLight className="text-2xl" />
        </div>
        {/* search function */}
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex space-x-4 items-center">
              <div className="flex-1 w-full">
                <Input
                  name="search"
                  placeholder="Search..."
                  hidelabel={true}
                  type="text"
                  value={values.search}
                  onChange={handleChange}
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
          {users.map((user) => (
            <div key={user} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-3">
              <User />
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

export default Sales;
