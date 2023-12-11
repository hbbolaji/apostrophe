import React, { useEffect, useState } from "react";
import { PiPlusLight } from "react-icons/pi";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import User from "../components/User";
import { UserType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSales } from "../api/sales";
import Spinner from "../components/Spinner";

const Sales = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    if (value === "") setData(users);
    else
      setData(
        data.filter(
          (user: UserType) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: any = await await getSales(token);
      if (result.data) {
        setLoading(false);
        setUsers(result.data);
        setData(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex space-between w-full">
      <div className="flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Sales Agents</p>
          <PiPlusLight
            className="text-2xl cursor-pointer"
            onClick={() => {
              navigate("/dashboard/sales/add");
            }}
          />
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
                  hidelabel="true"
                  type="text"
                  value={values.search}
                  onChange={handleChange}
                  close={() => {
                    setValues({ search: "" });
                    setData(users);
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
          {data.map((user: UserType) => (
            <div
              key={user.id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
            >
              <User user={user} />
            </div>
          ))}
        </div>
        {error ? (
          <p className="text-center py-24">No sales agents available</p>
        ) : null}
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default Sales;
