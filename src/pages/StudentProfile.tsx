import React, { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import GuardianCard from "../components/GuardianCard";

const StudentProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [guardian, setGuardian] = useState<any>(null);

  const getGuardian = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${state.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setGuardian(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/dashboard/me");
    }
    getGuardian();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-8 pb-8 px-5 w-full space-y-6">
      <StudentCard {...state} />
      <div className="flex">
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full ">
            NO payment history {/* information about payment history */}
          </div>
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            Awaiting Course Registration
          </div>
          <div className="col-span-1  bg-white shadow-xl rounded-lg p-4 w-full">
            {guardian ? (
              <GuardianCard guardian={guardian} />
            ) : (
              <p>No guardian yet</p>
            )}
          </div>
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            TimeTable
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
