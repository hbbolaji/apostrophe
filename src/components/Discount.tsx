import React from "react";
import { useNavigate } from "react-router-dom";

const Discount: React.FC<{ discount: any }> = ({ discount }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-lg rounded-lg cursor-pointer"
      onClick={() =>
        navigate(`/dashboard/discounts/edit/${discount.id}`, {
          state: discount,
        })
      }
    >
      <div
        className={`h-32 w-full ${
          discount.enabled ? "bg-orange-400" : "bg-gray-400"
        } rounded-t-lg`}
      ></div>
      <div className="py-2 px-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-600">
            {discount.discountTitle}
          </p>
          <p className="font-semibold text-gray-500">
            {discount.discountValue} %
          </p>
        </div>
        <p className="text-sm text-gray-500">{discount.notes}</p>
      </div>
    </div>
  );
};

export default Discount;
