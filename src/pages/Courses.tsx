import React from "react";
import Course from "../components/Course";
import { useNavigate } from "react-router-dom";
import { PiPlusLight } from "react-icons/pi";

const Courses = () => {
  const navigate = useNavigate();
  const courseList = [
    "SAT One Year Subscription",
    "SAT Four Month Subscription",
    "SAT Practice Test Course",
    "TOEFL",
    "IELTS",
  ];
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
        {courseList.map((course: string) => (
          <div key={course} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-3">
            <Course courseTitle={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
