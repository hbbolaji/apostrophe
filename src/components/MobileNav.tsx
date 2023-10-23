import React from "react";
import Sidebar from "./Sidebar";
import { PiXBold } from "react-icons/pi";

type MobileNavType = {
  closeNav: () => void;
};

const MobileNav: React.FC<MobileNavType> = ({ closeNav }) => {
  return (
    <div
      className="bg-black w-full fixed top-0 left-0 z-50 bg-opacity-50"
      onClick={closeNav}
    >
      <div
        className="md:hidden w-2/3 sm:w-1/2 bg-orange-100 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end px-8">
          <PiXBold
            onClick={closeNav}
            className="text-right text-2xl pointer-cursor text-gray-500"
          />
        </div>
        <Sidebar mobile={true} closeNav={closeNav} />
      </div>
    </div>
  );
};

export default MobileNav;
