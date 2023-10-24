import React from "react";
import { PiPlusLight } from "react-icons/pi";
import Rightbar from "../components/Rightbar";
import AddSales from "../components/Sales/AddSales";

const Sales = () => {
  return (
    <div className="flex space-between w-full">
      <div className="flex-1 md:pt-8 px-5">
        <p>Dashboard Sales</p>
        <PiPlusLight className="text-2xl" />
      </div>
      <div className="relative">
        {/* large monitor view */}
        <Rightbar>
          <AddSales />
        </Rightbar>
      </div>
    </div>
  );
};

export default Sales;
