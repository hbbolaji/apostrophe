import React from "react";

type SideModalType = {
  children: JSX.Element;
  closeNav: () => void;
};

const SideModal: React.FC<SideModalType> = ({ closeNav, children }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full bg-black bg-opacity-50"
      onClick={closeNav}
    >
      <div className="2xl:hidden md:pt-8 px-4 w-full md:w-96 h-full bg-slate-200 bg-opacity-20">
        {children}
      </div>
    </div>
  );
};

export default SideModal;
