import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-96 justify-center items-center">
      <div className="h-16 w-16 border-4 border-r-orange-500 animate-spin rounded-full"></div>
    </div>
  );
};

export default Spinner;
