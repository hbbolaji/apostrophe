import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { StudentType } from "../utils/types";
import Student from "../components/Student";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStudentsBySales } from "../api/student";
import Spinner from "../components/Spinner";

const SalesProfile = () => {
  const location = useLocation();
  const { id } = useParams();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const [students, setStudents] = useState<StudentType[]>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await getStudentsBySales(token, id as string);
      if (result.data) {
        setLoading(false);
        setStudents(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
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
      {error ? (
        <p className="text-center py-24">No sales agents available</p>
      ) : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default SalesProfile;
