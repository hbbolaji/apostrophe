import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { StudentType } from "../utils/types";
import Student from "../components/Student";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SalesProfile = () => {
  const location = useLocation();
  const { id } = useParams();
  const { token } = useAuth();
  const [students, setStudents] = useState<StudentType[]>([]);

  const getStudents = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/student/all/${id}`,
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
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-8 px-5 w-full space-y-5">
      <div className="p-3">
        <Profile {...location.state} />
      </div>
      <p className="font-semibold text-xl px-5">Students</p>
      {students.length > 0 ? (
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
      ) : (
        <p>No students registered yet</p>
      )}
    </div>
  );
};

export default SalesProfile;
