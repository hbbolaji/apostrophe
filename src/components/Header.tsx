import React from "react";
import Logo from "../images/apostrophe.png";
import { PiList } from "react-icons/pi";
import { NavLink } from "react-router-dom";

type HeaderType = {
  open: boolean;
  openNav: () => void;
};

const Header: React.FC<HeaderType> = ({ open, openNav }) => {
  return (
    <div className="md:hidden p-4 shadow-lg bg-orange-200 bg-opacity-20 items-center flex flex-row-reverse justify-between">
      <NavLink to="/dashboard/sales">
        <img className="h-6 cursor-pointer" src={Logo} alt="logo" />
      </NavLink>
      <div className="">
        <PiList
          onClick={openNav}
          className="text-3xl text-gray-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
