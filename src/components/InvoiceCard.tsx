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
        <div
          className={`p-2 grid w-full ${
            role === "sales" ? "grid-cols-7" : "grid-cols-5"
          } gap-4 rounded-lg bg-orange-200 bg-opacity-60 `}
        >
          <div className="col-span-1">Date</div>
          <div className="col-span-2">Course</div>
          <div className="col-span-1">Amount</div>
          {role === "sales" ? (
            <>
              <div className="col-span-1 text-center">Edit</div>
              <div className="col-span-1 text-center">Pay</div>
            </>
          ) : null}
          <div className="col-span-1 text-center">Show</div>
        </div>
        {invoice.map((inv: any) => (
          <div
            className={`p-2 rounded-lg grid gap-4 ${
              role === "sales" ? "grid-cols-7" : "grid-cols-5"
            }   ${
              inv.status === "Paid"
                ? "bg-green-100 bg-opacity-60"
                : "bg-red-100 bg-opacity-60"
            }`}
            key={inv.id}
          >
            <div className="text-sm col-span-1">
              {moment(inv.validityDate).format("MMM Do YY")}
            </div>
            <div className="text-sm col-span-2">{inv.courseTitle}</div>
            <div className="font-semibold col-span-1">${inv.courseAmount}</div>
            {role === "sales" ? (
              <div
                className="col-span-1 border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/invoices/edit/1`, {
                    state: inv,
                  });
                }}
              >
                <p className="text-sm text-center text-orange-500">Edit </p>
              </div>
            ) : null}
            {role === "sales" ? (
              <div
                className="col-span-1 border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/payments/add`, {
                    state: {
                      studentId: inv.studentId,
                      invoiceId: inv.id,
                    },
                  });
                }}
              >
                <p className="text-sm text-center text-orange-500">Pay </p>
              </div>
            ) : null}
            <div
              className="col-span-1 border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate(`/dashboard/templates`, {
                  state: inv,
                });
              }}
            >
              <p className="text-sm text-center text-orange-500">Show</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceCard;
