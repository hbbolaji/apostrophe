import React from "react";
import moment from "moment";

const Invoice = () => {
  return (
    <div className="bg-gray-50 p-6 grid grid-cols-5 gap-4 hover:bg-gray-100 cursor-pointer">
      <div className="col-span-1">
        <p>{moment(Date.now()).format("MMMM Do YYYY")}</p>
      </div>
      <div className="col-span-1">
        <p>{moment(Date.now()).format("MMMM Do YYYY")}</p>
      </div>
      <div className="col-span-1">
        <p>TRY</p>
      </div>
      <div className="col-span-1">
        <p>500</p>
      </div>
      <div className="col-span-1">
        <p>Status</p>
      </div>
    </div>
  );
};

export default Invoice;
