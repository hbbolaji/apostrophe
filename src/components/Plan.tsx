import React from "react";
import { useNavigate } from "react-router-dom";

const Plan: React.FC<{ plan: any }> = ({ plan }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-lg rounded-lg cursor-pointer"
      onClick={() =>
        navigate(`/dashboard/plans/edit/${plan.id}`, {
          state: plan,
        })
      }
    >
      <div
        className={`h-32 w-full ${
          plan.enabled ? "bg-orange-400" : "bg-gray-400"
        } rounded-t-lg`}
      ></div>
      <div className="py-2 px-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-600">
            Fee: {plan.totalFees}
          </p>
          <p className="font-semibold text-gray-500">
            {plan.noOfInstalments} times
          </p>
        </div>
        <p className="text-sm text-gray-500">{plan.notes}</p>
      </div>
    </div>
  );
};

export default Plan;
