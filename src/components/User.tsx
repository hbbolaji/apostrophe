import React from "react";
import { UserType } from "../utils/types";
import Avatar, { genConfig } from "react-nice-avatar";
import { useNavigate } from "react-router-dom";

const User: React.FC<{ user: UserType }> = ({ user }) => {
  const navigate = useNavigate();
  let config = genConfig(user.emailAddress);
  return (
    <div
      className="w-full bg-white py-4 text-center px-1 rounded-xl flex flex-col items-center space-y-3 shadow hover:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/dashboard/sales/${user.id}`, { state: user });
      }}
    >
      <div className="h-20 w-20">
        <Avatar className="h-20 w-20 rounded-full" {...config} sex="man" />
      </div>
      <div className=" space-y-1.5">
        <p className="text-base">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-500 text-center">{user.emailAddress}</p>
        <div
          className={`text-center ${
            user.status === "active" ? "bg-green-200" : "bg-red-200"
          } rounded-full py-0.5 text-xs px-3`}
        >
          {user.status}
        </div>
      </div>
    </div>
  );
};

export default User;
