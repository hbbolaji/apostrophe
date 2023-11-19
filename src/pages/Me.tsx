import React from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile";

const Me = () => {
  const { currentUser } = useAuth();
  return (
    <div className="w-full md:pt-8 px-5">
      <Profile {...currentUser} />
    </div>
  );
};

export default Me;
