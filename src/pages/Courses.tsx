import React, { useEffect, useState } from "react";
import Course from "../components/Course";
import { useNavigate } from "react-router-dom";
import { PiPlusLight } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";
import { getCourses } from "../api/course";
import Spinner from "../components/Spinner";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await getCourses(token);
      if (result.data) {
        setLoading(false);
        setCourses(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full md:pt-8 px-5 space-y-5">
      <div className="flex items-center justify-between py-3">
        <p className="text-2xl">Courses</p>
        <div className="flex space-x-5 items-center">
          <PiPlusLight
            className="text-2xl cursor-pointer"
            onClick={() => {
              navigate("/dashboard/courses/add");
            }}
          />
        </div>
      </div>
      <div className="min-h-96">
        <div className="flex flex-wrap">
          {courses.map((course) => (
            <div key={course.id} className="w-full sm:w-1/2  2xl:w-1/4 p-3">
              <Course course={course} />
            </div>
          ))}
        </div>
        {error ? (
          <p className="text-center py-24">Error Loading list of courses</p>
        ) : null}
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default Courses;
