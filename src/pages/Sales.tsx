import React, { useEffect, useState } from "react";
import { PiPlusLight } from "react-icons/pi";
// import Rightbar from "../components/Rightbar";
// import AddSales from "../components/Sales/AddSales";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import User from "../components/User";
import { usersData } from "../utils/data";
import { UserType } from "../utils/types";

const Sales = () => {
  const [users, setUsers] = useState([]);

  const onSearch = (value: string) => {
    if (value === "") setUsers(usersData as []);
    else
      setUsers(
        users.filter(
          (user: UserType) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
  };

  // const onFilter = () => {}
  useEffect(() => {
    setUsers(usersData as []);
  }, []);
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
            onSearch(values.search);
          }}
        >
          {({ values, handleChange, setValues }) => (
            <Form className="flex space-x-4 ">
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
                    setUsers(usersData as []);
                  }}
                />
              </div>
              <button
                type="submit"
                className="text-sm md:text-base block px-10 bg-orange-500 text-white rounded-full font-semibold"
              >
                Search
              </button>
            </Form>
          )}
        </Formik>

        {/* List of users */}
        <div className="flex flex-wrap">
          {users.map((user: UserType) => (
            <div
              key={user.uid}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
            >
              <User user={user} />
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
