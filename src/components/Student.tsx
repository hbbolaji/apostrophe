import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { StudentType } from "../utils/types";

const Student: React.FC<{ student: StudentType }> = ({ student }) => {
  const config = genConfig(student.emailAddress);
  return (
    <div className="w-full bg-white p-6 rounded-lg flex flex-col items-center space-y-4 shadow hover:shadow-lg cursor-pointer">
      <div className="h-24 w-24">
        <Avatar className="h-24 w-24 rounded-full" {...config} />
      </div>
      <div className="text-center">
        <p className="text-lg">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-sm text-gray-400">Course</p>
      </div>
    </div>
  );
};

export default Student;