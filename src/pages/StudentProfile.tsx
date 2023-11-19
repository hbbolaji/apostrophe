import React from "react";
import Profile from "../components/Profile";
import { studentsData } from "../utils/data";

const StudentProfile = () => {
  return (
    <div className="pt-8 px-5 w-full">
      <Profile {...studentsData[0]} />
    </div>
  );
};

export default StudentProfile;
