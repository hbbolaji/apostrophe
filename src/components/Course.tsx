import React from "react";

const Course: React.FC<{ courseTitle: string }> = ({ courseTitle }) => {
  return (
    <div className="shadow-lg rounded-lg cursor-pointer">
      <div className="h-32 w-full bg-orange-400 rounded-t-lg"></div>
      <div className="py-2 px-4 flex items-center justify-between">
        <p className="font-xl">{courseTitle}</p>
        <p className="font-semibold">$78</p>
      </div>
    </div>
  );
};

export default Course;
