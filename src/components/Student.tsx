import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { StudentType } from "../utils/types";
import { useNavigate } from "react-router-dom";

const Student: React.FC<{ student: StudentType }> = ({ student }) => {
  const navigate = useNavigate();
  const config = genConfig(student.emailAddress);

  return (
    <div
      className="w-full bg-white p-6 rounded-lg flex flex-col items-center space-y-4 shadow hover:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/dashboard/students/${student.id}`, { state: student });
      }}
    >
      <div className="h-24 w-24">
        <Avatar className="h-24 w-24 rounded-full" {...config} />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-sm text-gray-400">{student.emailAddress}</p>
        <p className="text-sm text-gray-400">{student.courseTitle}</p>
        <p className="text-sm text-gray-400">
          {student.salesFirstName} {student.salesLastName}
        </p>
      </div>
    </div>
  );
};

export default Student;
