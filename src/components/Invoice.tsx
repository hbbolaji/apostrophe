import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Invoice: React.FC<{ invoice: any }> = ({ invoice }) => {
  const paid =
    invoice.invoicePortion.filter((portion: any) => portion.status === "unpaid")
      .length < 1;
  const navigate = useNavigate();
  return (
    <div
      className={`text-sm xl:text-base bg-gray-50 p-6 grid border-b border-b-2 grid-cols-6 content-center gap-4 ${
        !paid ? "hover:bg-red-50" : "hover:bg-green-50"
      } cursor-pointer`}
      onClick={() => navigate(`/dashboard/templates`, { state: invoice })}
    >
      <div className="col-span-6 sm:col-span-2">
        <p className="font-semibold">
          {invoice.studentInfo.studentFirstName}{" "}
          {invoice.studentInfo.studentLastName}
        </p>
      </div>
      <div className="col-span-2">
        <p>{moment(invoice.validityDate).format("MMM Do YYYY")}</p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <p>USD {invoice.courseInfo.courseAmount}</p>
      </div>
      <div className={`col-span-2 sm:col-span-1 `}>
        <p
          className={`${
            paid ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"
          } bg-opacity-40 text-center px-3 py-1.5 rounded-full`}
        >
          {paid ? "Paid" : "Unpaid"}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
