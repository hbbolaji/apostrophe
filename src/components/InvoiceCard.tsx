import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRemain } from "../utils/helper";
import {
  PiEyeLight,
  PiMoneyLight,
  PiPencilLight,
  PiPlusLight,
} from "react-icons/pi";

const InvoiceCard: React.FC<{
  invoice: any;
  payments?: any;
  studentId: string;
}> = ({ invoice, studentId }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = currentUser;
  const isFullyPaid = (inv: any) =>
    inv.invoicePortion.filter((portion: any) => portion.status === "unpaid")
      .length < 1;
  return (
    <div className="px-0.5 lg:px-5 py-3 space-y-4 ">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <p className="font-semibold ">Invoice Info</p>
        </div>
        {role === "sales" ? (
          <div
            className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/invoices/add", { state: studentId });
            }}
          >
            <PiPlusLight className="text-orange-500" />
            <span className="text-sm text-orange-500">Add Invoice</span>
          </div>
        ) : null}
      </div>
      {/* invoice data type */}
      <div className="space-y-2">
        <div
          className={`hidden p-2 lg:grid w-full text-sm font-semibold ${
            role === "sales" ? "grid-cols-8" : "grid-cols-6"
          } gap-4 rounded-lg bg-orange-200 bg-opacity-60 `}
        >
          <div className="col-span-2">Date</div>
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
            className={`p-2 text-center lg:text-left rounded-lg grid gap-1 lg:gap-4 ${
              role === "sales" ? "grid-cols-8" : "grid-cols-6"
            }   ${
              isFullyPaid(inv)
                ? "bg-green-100 bg-opacity-60"
                : "bg-red-100 bg-opacity-60"
            }`}
            key={inv.id}
          >
            <div
              className={`text-sm ${
                role === "sales" ? "col-span-3" : "col-span-2"
              } lg:col-span-2`}
            >
              {moment(inv.validityDate).format("MMM Do YYYY")}
            </div>
            <div
              className={`text-sm ${
                role === "sales" ? "col-span-3" : "col-span-2"
              } lg:col-span-2`}
            >
              {inv.courseInfo.courseTitle}
            </div>
            <div
              className={`font-semibold ${
                role === "sales" ? "col-span-3" : "col-span-1"
              } lg:col-span-1`}
            >
              ${getRemain(inv.invoicePortion)}
            </div>
            {role === "sales" ? (
              <>
                {!isFullyPaid(inv) ? (
                  <div
                    className="col-span-3 lg:col-span-1 flex justify-center cursor-pointer"
                    onClick={() => {
                      navigate(`/dashboard/invoices/edit/1`, {
                        state: inv,
                      });
                    }}
                  >
                    <PiPencilLight className="hidden lg:block text-center text-xl text-orange-500 font-semibold" />
                    <div className="px-4 py-1 text-xs lg:hidden text-orange-500 border border-orange-500 rounded-full">
                      Edit
                    </div>
                  </div>
                ) : (
                  <div className="col-span-3 lg:col-span-1 flex justify-center cursor-pointer">
                    <span className="text-center">-</span>
                  </div>
                )}
              </>
            ) : null}

            {role === "sales" ? (
              <>
                {!isFullyPaid(inv) ? (
                  <div
                    className="col-span-3 lg:col-span-1 flex justify-center cursor-pointer"
                    onClick={() => {
                      navigate(`/dashboard/payments/add`, {
                        state: inv,
                      });
                    }}
                  >
                    <PiMoneyLight className="hidden lg:block text-center text-xl text-orange-500 font-semibold" />{" "}
                    <div className="px-4 py-1 text-xs lg:hidden text-orange-500 border border-orange-500 rounded-full">
                      Pay
                    </div>
                  </div>
                ) : (
                  <div className="col-span-3 lg:col-span-1 flex justify-center cursor-pointer">
                    <span className="text-center">-</span>
                  </div>
                )}
              </>
            ) : null}
            <div
              className={`${
                role === "sales" ? "col-span-3" : "col-span-1"
              } lg:col-span-1 flex justify-center cursor-pointer`}
              onClick={() => {
                navigate(`/dashboard/templates`, {
                  state: inv,
                });
              }}
            >
              <PiEyeLight className="sm:hidden lg:block text-center text-xl text-orange-500 font-semibold" />
              <div className="hidden sm:block px-4 py-1 text-xs lg:hidden text-orange-500 border border-orange-500 rounded-full">
                Show
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceCard;
