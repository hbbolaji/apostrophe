import React from "react";
import Logo from "../images/apostrophe.png";
import navigation, { NavItemType } from "../utils/navigation";
import {
  PiStudentLight,
  PiOfficeChairLight,
  PiNewspaperClippingLight,
  PiTriangleLight,
  PiPercentLight,
  PiBookLight,
  PiPersonSimpleBikeLight,
  PiTreeStructureLight,
  PiArrowBendRightUpBold,
  PiArrowLineRightLight,
  PiChartLineLight,
} from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    case "Profile":
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
    case "Dashboard":
      icon = <PiChartLineLight className="text-2xl" />;
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
  }
  return icon;
};

const Sidebar: React.FC<SidebarType> = ({ mobile, closeNav }) => {
  const navigate = useNavigate();
  const { sendToken, currentUser } = useAuth();
  const { role } = currentUser;
  return (
    <div className="left-0 top-0 md:pt-8 px-5 min-h-screen space-y-6">
      <div>
        <img
          className="hidden h-12 md:block cursor-pointer"
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="space-y-4 md:space-y-4 w-full">
        {navigation()
          .filter((route) => route.role === role)
          .map((data: NavItemType) => (
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
        {navigation()
          .filter((route) => route.role === "both")
          .map((data: NavItemType) => (
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
      <div
        className={`text-gray-600 relative flex w-full items-center space-x-3 hover:bg-orange-500 hover:bg-opacity-20 px-2 py-1 rounded-md cursor-pointer`}
        onClick={() => {
          sessionStorage.removeItem("token");
          sendToken("");
          navigate("/", { replace: true });
        }}
      >
        <PiArrowLineRightLight />
        <p className="tracking-wide text-sm sm:text-base md:text-lg font-light p-1">
          Log out
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
