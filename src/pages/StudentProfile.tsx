import React from "react";
import { studentsData } from "../utils/data";
import StudentCard from "../components/StudentCard";

const StudentProfile = () => {
  return (
    <div className="pt-8 px-5 w-full">
      <StudentCard {...studentsData[0]} />
    </div>
  );
};

export default StudentProfile;
