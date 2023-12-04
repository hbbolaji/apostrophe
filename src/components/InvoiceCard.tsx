import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InvoiceCard: React.FC<{ invoice: any; payments?: any }> = ({
  invoice,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = currentUser;
  return (
    <div className="px-5 py-3 space-y-4 ">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <p className="font-semibold ">Invoice Info</p>
        </div>
      </div>
      {/* invoice data type */}
      <div className="space-y-2">
        <div className="p-2 rounded-lg bg-orange-200 bg-opacity-60  flex justify-between items-center">
          <p>Date</p>
          <p>Course</p>
          <p>Amount</p>
          <p>Edit</p>
          <p>Show</p>
        </div>
        {invoice.map((inv: any) => (
          <div
            className={`p-2 rounded-lg  flex justify-between items-center ${
              inv.status === "Paid"
                ? "bg-green-100 bg-opacity-60"
                : "bg-red-100 bg-opacity-60"
            }`}
            key={inv.id}
          >
            <p className="text-sm">
              {moment(inv.validityDate).format("MMM Do YY")}
            </p>
            <p className="text-sm">{inv.courseTitle}</p>
            <p className="font-semibold ">${inv.courseAmount}</p>
            {role === "sales" ? (
              <div
                className=" border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/invoices/edit/1`, {
                    state: inv,
                  });
                }}
              >
                <p className="text-sm  text-orange-500">Edit </p>
              </div>
            ) : null}
            {role === "sales" ? (
              <div
                className=" border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/payments/add`, {
                    state: {
                      studentId: inv.studentId,
                      invoiceId: inv.id,
                    },
                  });
                }}
              >
                <p className="text-sm  text-orange-500">Pay </p>
              </div>
            ) : null}
            <div className=" border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer">
              <p className="text-sm  text-orange-500">Show</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceCard;
