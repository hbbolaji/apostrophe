import React from "react";
import { studentsData } from "../utils/data";
import StudentCard from "../components/StudentCard";
import { useLocation } from "react-router-dom";
import { StudentType } from "../utils/types";

const StudentProfile = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const student = studentsData.find((stud: StudentType) => stud.id === id);
  return (
    <div className="pt-8 pb-4 px-5 w-full space-y-6">
      <StudentCard {...(student || studentsData[0])} />
      <div className="flex">
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full ">
            no payment history
          </div>
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            Awaiting Course Registration
          </div>
          <div className="col-span-2 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            No Guardian added
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
