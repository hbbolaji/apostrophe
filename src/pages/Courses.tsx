import React, { useEffect, useState } from "react";
import Course from "../components/Course";
import { useNavigate } from "react-router-dom";
import { PiPlusLight } from "react-icons/pi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const { token } = useAuth();

  const getCourses = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/course/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setCourses(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
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
      <div className="flex flex-wrap">
        {courses.map((course) => (
          <div key={course.id} className="w-full sm:w-1/2  2xl:w-1/4 p-3">
            <Course course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
