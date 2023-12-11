import React, { useEffect, useState } from "react";
import { PiFunnelSimpleLight } from "react-icons/pi";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import Student from "../components/Student";
import { StudentType } from "../utils/types";
import Checkbox from "../components/Checkbox";
import { useAuth } from "../context/AuthContext";
import { getStudents } from "../api/student";
import Spinner from "../components/Spinner";

const Students = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const onSearch = (value: string) => {
    if (value === "") setData(students);
    else
      setData(
        data.filter(
          (user: StudentType) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
  };

  const onCheck = (value: string) => {
    const updatedList = [...filters, value];
    setFilters(updatedList);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: any = await getStudents(token);
      if (result.data) {
        setLoading(false);
        setStudents(result.data);
        setData(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = (sex: string) => {
    setShowFilter(false);
  };

  return (
    <div className="flex space-between w-full">
      <div className="relative flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Students</p>
          <div className="flex space-x-5 items-center">
            <div className="flex">
              <div
                className="cursor-pointer flex items-center space-x-5 border border-1 border-orange-300 rounded-full py-1 px-3"
                onClick={toggleFilter}
              >
                <p className="text-sm text-gray-500 font-semibold">Filter</p>
                <PiFunnelSimpleLight className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* filter section */}
        {showFilter ? (
          <div className="absolute z-30 right-5 w-72 min-h-96 bg-white rounded-lg shadow-lg p-4 space-y-3">
            <p className="text-gray-500 font-semibold">Gender</p>
            <div className="space-y-3 px-5">
              <Checkbox
                checked={male}
                name="filters"
                value="male"
                label="Male"
                handleChange={() => {
                  setMale((prev) => !prev);
                  onCheck("male");
                }}
              />
              <Checkbox
                checked={female}
                name="filters"
                value="female"
                label="Female"
                handleChange={() => {
                  setFemale((prev) => !prev);
                  onCheck("female");
                }}
              />
            </div>

            <p className="text-gray-500 font-semibold">Language</p>
            <div className="space-y-3 px-5">
              <Checkbox
                // checked={checkbox.includes("english")}
                name="filters"
                value="english"
                label="English"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("turkish")}
                name="filters"
                value="turkish"
                label="Turkish"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("arabic")}
                name="filters"
                value="arabic"
                label="Arabic"
                handleChange={() => onCheck}
              />
            </div>
            <p className="text-gray-500 font-semibold">Acadmeic Status</p>
            <div className="space-y-3 px-5">
              <Checkbox
                // checked={checkbox.includes("active")}
                name="filters"
                value="active"
                label="Active"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("withdrawn")}
                name="filters"
                value="withdrawn"
                label="Withdrawn"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("new")}
                name="filters"
                value="new"
                label="New"
                handleChange={() => onCheck}
              />
            </div>
            <p className="text-gray-500 font-semibold">Financial Status</p>
            <div className="space-y-3 px-5">
              <Checkbox
                // checked={checkbox.includes("paid")}
                name="filters"
                value="paid"
                label="Paid"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("inNegotiation")}
                name="filters"
                value="inNegotiation"
                label="In Negotiation"
                handleChange={() => onCheck}
              />
              <Checkbox
                // checked={checkbox.includes("expired")}
                name="filters"
                value="expired"
                label="Expired"
                handleChange={() => onCheck}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => onFilter("male")}
                className="py-1 text-sm font-semibold px-4 bg-orange-500 text-white rounded-full"
              >
                Apply
              </button>
            </div>
          </div>
        ) : null}

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
                  hidelabel="true"
                  type="text"
                  value={values.search}
                  onChange={handleChange}
                  close={() => {
                    setValues({ search: "" });
                    setData(students);
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
          {data.map((student: StudentType) => (
            <div
              key={student.id}
              className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-3"
            >
              <Student student={student} />
            </div>
          ))}
        </div>
        {error ? (
          <p className="text-center py-24">No students available</p>
        ) : null}
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default Students;
