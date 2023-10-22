import React from "react";
import Logo from "../images/apostrophe.png";
import { GrClose, GrMenu } from "react-icons/gr";

const Header = () => {
  return (
    <div className="md:hidden p-4 shadow-lg bg-orange-200 bg-opacity-20 items-center flex justify-between">
      <img className="h-6" src={Logo} alt="logo" />
      <div className="">
        <GrMenu className="text-3xl text-gray-400 cursor-pointer" />
        <GrClose className="hidden text-3xl text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
