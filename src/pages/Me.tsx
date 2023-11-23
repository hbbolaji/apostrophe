import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile";
import { studentsData } from "../utils/data";
import { StudentType } from "../utils/types";
import Student from "../components/Student";

const Me = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  useEffect(() => {
    setStudents(studentsData);
  }, []);
  const { currentUser } = useAuth();
  return (
    <div className="w-full md:pt-8 px-5 space-y-5">
      <div className="p-3">
        <Profile {...currentUser} />
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

export default Me;
