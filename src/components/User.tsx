import React from "react";
import { UserType } from "../utils/types";
import Avatar, { genConfig } from "react-nice-avatar";
import { useNavigate } from "react-router-dom";

const User: React.FC<{ user: UserType }> = ({ user }) => {
  const navigate = useNavigate();
  let config = genConfig(user.emailAddress);
  return (
    <div
      className="w-full bg-white p-6 rounded-lg flex flex-col items-center space-y-4 shadow hover:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/dashboard/sales/${user.id}`);
      }}
    >
      <div className="h-24 w-24">
        <Avatar className="h-24 w-24 rounded-full" {...config} sex="man" />
      </div>
      <div className="text-center">
        <p className="text-lg">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-400">{user.emailAddress}</p>
      </div>
      <div className="flex space-x-3 w-full">
        <button className="block w-full border text-sm rounded-full p-1 border-orange-500 text-orange-500">
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default User;
