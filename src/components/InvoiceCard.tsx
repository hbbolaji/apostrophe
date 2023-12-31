import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRemain } from "../utils/helper";

const InvoiceCard: React.FC<{ invoice: any; payments?: any }> = ({
  invoice,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = currentUser;
  const isFullyPaid = (inv: any) =>
    inv.invoicePortion.filter((portion: any) => portion.status === "unpaid")
      .length < 1;
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
          <div className="col-span-1">Amount (U)</div>
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
              isFullyPaid(inv)
                ? "bg-green-100 bg-opacity-60"
                : "bg-red-100 bg-opacity-60"
            }`}
            key={inv.id}
          >
            <div className="text-sm col-span-1">
              {moment(inv.validityDate).format("MMM Do YYYY")}
            </div>
            <div className="text-sm col-span-2">
              {inv.courseInfo.courseTitle}
            </div>
            <div className="font-semibold col-span-1">
              ${getRemain(inv.invoicePortion)}
            </div>
            {role === "sales" ? (
              <>
                {!isFullyPaid(inv) ? (
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
                ) : (
                  <span className="text-center">-</span>
                )}
              </>
            ) : null}

            {role === "sales" ? (
              <>
                {!isFullyPaid(inv) ? (
                  <div
                    className="col-span-1 border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                    onClick={() => {
                      navigate(`/dashboard/payments/add`, {
                        state: inv,
                      });
                    }}
                  >
                    <p className="text-sm text-center text-orange-500">Pay</p>
                  </div>
                ) : (
                  <span className="text-center">-</span>
                )}
              </>
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
