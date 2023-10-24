import React from "react";

type RightbarType = {
  children: JSX.Element;
};

const Rightbar: React.FC<RightbarType> = ({ children }) => {
  return (
    <div>
      <div className="hidden 2xl:block w-96 h-full md:pt-8 px-4 bg-slate-300 bg-opacity-10">
        {children}
      </div>
    </div>
  );
};

export default Rightbar;
