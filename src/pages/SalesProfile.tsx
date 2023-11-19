import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { StudentType } from "../utils/types";
import { studentsData } from "../utils/data";
import Student from "../components/Student";

const SalesProfile = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  useEffect(() => {
    setStudents(studentsData);
  }, []);
  return (
    <div className="pt-8 px-5 w-full space-y-5">
      <div className="p-3">
        <Profile {...students[0]} />
      </div>
      <div className="flex flex-wrap">
        {students.map((student: StudentType) => (
          <div
            key={student.uid}
            className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-3"
          >
            <Student student={student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesProfile;
