import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import Student from "../components/Student";
import { StudentType } from "../utils/types";
import { useAuth } from "../context/AuthContext";
import { getStudents } from "../api/student";
import Spinner from "../components/Spinner";

const Students = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className="flex space-between w-full">
      <div className="relative flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Students</p>
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
