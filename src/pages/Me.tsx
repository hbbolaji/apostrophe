import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile";
import { StudentType } from "../utils/types";
import Student from "../components/Student";
import axios from "axios";

const Me = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const { currentUser, token, getCurrentUser } = useAuth();

  const getStudents = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/student/all/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setStudents(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // setStudents(studentsData);
    getStudents();
    getCurrentUser(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full md:pt-8 px-5 space-y-5">
      <div className="p-3">
        <Profile {...currentUser} />
      </div>
      <p className="text-xl font-semibold px-5">Students</p>
      <div className="flex flex-wrap">
        {students.map((student: StudentType) => (
          <div
            key={student.id}
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
