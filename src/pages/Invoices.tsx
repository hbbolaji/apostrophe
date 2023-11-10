import React from "react";
import Invoice from "../components/Invoice";

const Invoices = () => {
  const invoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15];
  return (
    <div className="flex space-between w-full">
      <div className="flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Invoices</p>
        </div>
        {/* Filters */}
        <div></div>
        {/* List of invoices */}
        <div>
          <div className="bg-gray-200 p-4 rounded-t-lg grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p>Issuance Date</p>
            </div>
            <div className="col-span-1">
              <p>Validity Date</p>
            </div>
            <div className="col-span-1">
              <p>Currency</p>
            </div>
            <div className="col-span-1">
              <p>Amount</p>
            </div>
            <div className="col-span-1">
              <p>Status</p>
            </div>
          </div>
          {invoices.map((inv) => (
            <div key={inv}>
              <Invoice />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
