import React, { useEffect } from "react";
import StudentCard from "../components/StudentCard";
import { useLocation, useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard/me");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-8 pb-4 px-5 w-full space-y-6">
      <StudentCard {...location.state} />
      <div className="flex">
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full ">
            NO payment history {/* information about payment history */}
          </div>
          <div className="col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            Awaiting Course Registration
          </div>
          <div className="col-span-2 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            No Guardian added
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
