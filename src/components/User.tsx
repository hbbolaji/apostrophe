import React from "react";

type UserType = {};

const User: React.FC<UserType> = () => {
  return (
    <div className="w-full w-full xl:p-6 border border-orange-100 rounded-lg flex flex-col items-center space-y-4 hover:shadow-lg cursor-pointer">
      <div className="h-24 w-24 rounded-full bg-gray-100"></div>
      <div className="text-center">
        <p className="text-lg">FirstName LastName</p>
        <p className="text-sm text-gray-400">Sales</p>
      </div>
      <div className="flex space-x-3 w-full">
        <button className="inline-block w-full text-sm bg-orange-500 text-white p-1 rounded-full">
          Edit
        </button>
        <button className="block w-full border text-sm rounded-full p-1 border-orange-500 text-orange-500">
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default User;
