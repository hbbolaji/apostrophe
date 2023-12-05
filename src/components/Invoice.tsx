import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Invoice: React.FC<{ invoice: any }> = ({ invoice }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-gray-50 p-6 grid grid-cols-6 content-center gap-4 ${
        invoice.status === "Unpaid" ? "hover:bg-red-50" : "hover:bg-green-50"
      } cursor-pointer`}
      onClick={() => navigate(`/dashboard/templates`, { state: invoice })}
    >
      <div className="col-span-2">
        <p>
          {invoice.studentFirstName} {invoice.studentLastName}
        </p>
      </div>
      <div className="col-span-2">
        <p>{moment(invoice.validityDate).format("MMMM Do YYYY")}</p>
      </div>
      <div className="col-span-1">
        <p>USD {invoice.courseAmount}</p>
      </div>
      <div className={`col-span-1 `}>
        <p
          className={`${
            invoice.status === "Unpaid"
              ? "bg-red-200 text-red-500"
              : "bg-green-200 text-green-500"
          } bg-opacity-40 text-center px-3 py-1.5 rounded-full`}
        >
          {invoice.status}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
