import React from "react";

type StudentType = {};

const Student: React.FC<StudentType> = () => {
  return (
    <div className="w-full w-full xl:p-6 border border-orange-100 rounded-lg flex flex-col items-center space-y-4 hover:shadow-lg cursor-pointer">
      <div className="h-24 w-24 rounded-full bg-gray-100"></div>
      <div className="text-center">
        <p className="text-lg">FirstName LastName</p>
        <p className="text-sm text-gray-400">Course</p>
      </div>
    </div>
  );
};

export default Student;
