import moment from "moment";
import React from "react";
import { PiNotePencilThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PaymentCard: React.FC<{ invoice: any }> = ({ invoice }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = currentUser;
  return (
    <div className="px-5 py-3 space-y-4 ">
      <div className="flex justify-between items-center">
        <p className="font-semibold ">Invoice Info</p>
        {role === "sales" ? (
          <div
            className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/invoices/edit/1`, {
                state: invoice,
              });
            }}
          >
            <div>
              <PiNotePencilThin className="text-orange-500" />
            </div>
            <p className="text-sm  text-orange-500">Edit </p>
          </div>
        ) : null}
      </div>
      <div className="space-y-2">
        <p>
          Due on:{" "}
          <span className="text-sm">
            {moment(invoice[0].validityDate).format("MMMM Do YYYY")}
          </span>
        </p>
        <div className="flex  justify-between">
          <p>
            Course: <span className="text-sm">{invoice[0].courseTitle}</span>
          </p>
          <p className="font-semibold ">${invoice[0].courseAmount}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">List of Payment Made</p>
      </div>
      <div className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer">
        <p className="text-sm  text-orange-500">Show Invoice Template </p>
      </div>
    </div>
  );
};

export default PaymentCard;