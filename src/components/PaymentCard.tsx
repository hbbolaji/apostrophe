import moment from "moment";
import React from "react";

const PaymentCard: React.FC<{ payments: any }> = ({ payments }) => {
  return (
    <div className="px-5 py-3 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold ">Payment Info</p>
      </div>
      {/* list of payments */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 text-sm font-semibold bg-orange-200 bg-opacity-30 rounded-lg">
          <p>Date</p>
          <p>Amount Paid (currency)</p>
          <p>Paid to</p>
        </div>
        {payments.map((pay: any) => (
          <a
            href={pay.receipt}
            target="blank"
            className="flex cursor-pointer items-center justify-between text-orange-500 p-2 text-sm font-semibold bg-orange-200 bg-opacity-30 rounded-lg"
            key={pay.id}
          >
            <p>{moment(pay.date).format("MMM Do YYYY")}</p>
            <p>
              {pay.currency} {pay.amountPaid}
            </p>
            <p>{pay.toAccount}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PaymentCard;
