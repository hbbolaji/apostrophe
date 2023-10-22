import React from "react";
import Logo from "../images/apostrophe.png";
import navigation, { NavItemType, NavType } from "../utils/navigation";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 pt-8 px-5  h-screen w-full space-y-6">
      <div>
        <img className="h-12 block cursor-pointer" src={Logo} alt="logo" />
      </div>
      <div className="space-y-4">
        {navigation.map((nav: NavType) => (
          <div className="space-y-3">
            <div key={nav.name}>
              <h4 className="capitalize text-base font-semibold">{nav.name}</h4>
            </div>
            <div className="space-y-3 pl-3">
              {nav.data.map((data: NavItemType) => (
                <div key={data.title}>
                  <p className="text-sm font-light p-1">{data.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
