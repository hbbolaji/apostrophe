import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className="relative hidden md:block w-6/12 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-orange-200 bg-opacity-20">
          <Sidebar />
        </div>
        <div className="min-h-screen w-full flex pt-8 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
