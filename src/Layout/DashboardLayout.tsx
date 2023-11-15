import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

const DashboardLayout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const openNav = () => {
    setOpen(true);
  };
  const closeNav = () => {
    setOpen(false);
  };
  return (
    <div className="h-screen z-10 relative md:min-h-10">
      <div>
        <Header open={open} openNav={openNav} />
      </div>
      {open ? <MobileNav closeNav={closeNav} /> : null}
      <div className="flex relative">
        <div className="h-screen overflow-y-auto hidden md:block pb-4 w-6/12 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-orange-300 bg-opacity-20">
          <Sidebar />
        </div>

        <div className="h-screen bg-gray-50 relative w-full flex overflow-y-auto z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
