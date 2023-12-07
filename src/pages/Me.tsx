import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile";
import { StudentType } from "../utils/types";
import Student from "../components/Student";
import { getStudentsBySales } from "../api/student";
import Spinner from "../components/Spinner";

const Me = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const { currentUser, token, getCurrentUser } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await getStudentsBySales(token, currentUser.id);
      if (result.data) {
        setLoading(false);
        setStudents(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
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
      {error ? <p className="text-center py-24">No students loaded</p> : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default Me;
