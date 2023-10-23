import React from "react";
import Logo from "../images/apostrophe.png";
import navigation, { NavItemType, NavType } from "../utils/navigation";
import {
  PiStudentLight,
  PiOfficeChairLight,
  PiNewspaperClippingLight,
  PiTriangleLight,
  PiMoneyLight,
  PiPercentLight,
  PiBookLight,
  PiPersonSimpleBikeLight,
  PiTreeStructureLight,
  PiArrowBendRightUpBold,
  PiOctagonBold,
  PiCircleBold,
  PiSquareBold,
} from "react-icons/pi";
import { NavLink } from "react-router-dom";

type SidebarType = {
  mobile?: boolean;
  closeNav?: () => void;
};

const icons = (name: string) => {
  let icon;
  switch (name) {
    case "Students":
      icon = <PiStudentLight className="text-2xl" />;
      break;
    case "Sales":
      icon = <PiOfficeChairLight className="text-2xl" />;
      break;
    case "Invoices":
      icon = <PiNewspaperClippingLight className="text-2xl" />;
      break;
    case "Templates":
      icon = <PiTriangleLight className="text-2xl" />;
      break;
    case "Payments":
      icon = <PiMoneyLight className="text-2xl" />;
      break;
    case "Plans":
      icon = <PiTreeStructureLight className="text-2xl" />;
      break;
    case "Discounts":
      icon = <PiPercentLight className="text-2xl" />;
      break;
    case "Courses":
      icon = <PiBookLight className="text-2xl" />;
      break;
    case "Guardians":
      icon = <PiPersonSimpleBikeLight className="text-2xl" />;
      break;
    case "Other":
      icon = <PiArrowBendRightUpBold className="text-lg" />;
      break;
    case "Payment":
      icon = <PiSquareBold className="text-lg" />;
      break;
    case "Invoice":
      icon = <PiOctagonBold className="text-lg" />;
      break;
    case "User":
      icon = <PiCircleBold className="text-lg" />;
      break;
  }
  return icon;
};

const Sidebar: React.FC<SidebarType> = ({ mobile, closeNav }) => {
  return (
    <div className="left-0 top-0 pt-8 px-5 h-screen space-y-6">
      <div>
        <img
          className="hidden h-12 md:block cursor-pointer"
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="space-y-8 w-full">
        {navigation.map((nav: NavType) => (
          <div className="space-y-3" key={nav.name}>
            <div className="flex space-x-3 items-center">
              {icons(nav.name)}
              <h4 className="tracking-wider capitalize text-sm font-semibold">
                {nav.name}
              </h4>
            </div>
            <div className="space-y-4 pl-1">
              {nav.data.map((data: NavItemType) => (
                <NavLink
                  to={data.nav}
                  onClick={closeNav}
                  key={data.title}
                  className={({ isActive }) =>
                    ` ${
                      isActive ? "text-orange-600 font-bold" : "text-gray-600"
                    } relative flex w-full items-center space-x-3 hover:bg-orange-500 hover:bg-opacity-20 px-2 py-1 rounded-md`
                  }
                >
                  {icons(data.title)}
                  <p className="tracking-wide text-sm sm:text-base md:text-lg font-light p-1">
                    {data.title}
                  </p>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
