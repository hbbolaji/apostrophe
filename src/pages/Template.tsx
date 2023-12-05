import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/apostrophe.png";
import moment from "moment";
import ReactToPrint from "react-to-print";

const Template = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state) {
      navigate("/dashboard/me");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full py-8 px-5">
      <div className="xl:w-1/2 mx-auto shadow-lg" ref={invoiceRef}>
        {/* Invoice Header */}
        <div className="h-32 bg-orange-200 bg-opacity-40 flex items-center px-12 justify-between rounded-t-lg">
          <div>
            <img
              className="hidden h-12 md:block cursor-pointer"
              src={Logo}
              alt="logo"
            />
          </div>
          <p className="text-sm font-semibold te">
            Due on: {moment(state.validityDate).format("MMMM Do YYYY")}
          </p>
        </div>
        {/* Invoice Body */}
        <div className="bg-white px-12 py-6 space-y-16">
          <div className="space-y-4">
            <p>
              Issued to:{" "}
              <span className="font-semibold">
                {state.studentFirstName} {state.studentLastName}
              </span>
            </p>
            <p>
              Issued on:{" "}
              <span className="font-semibold">
                {moment(state.issuanceDate).format("MMMM Do YYYY")}
              </span>
            </p>
          </div>
          <div>
            <div className="grid grid-cols-3 border-b border-gray-400 border-dashed text-sm text-gray-400 py-1">
              <div className="col-span-2">Desciption</div>
              <div className="col-span-1">Amount</div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-400 border-dashed py-5">
              <div className="col-span-2">{state.courseTitle}</div>
              <div className="col-span-1">$ {state.courseAmount}</div>
            </div>
            <div className="grid grid-cols-3  border-dashed py-5">
              <div className="col-span-2 text-lg font-semibold">Total</div>
              <div className="col-span-1">$ {state.courseAmount}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice print action */}
      <ReactToPrint
        trigger={() => (
          <div className="xl:w-1/2 mx-auto text-center py-2 bg-orange-500 cursor-pointer text-white">
            <p className="text-sm font-semibold">Print</p>
          </div>
        )}
        content={() => invoiceRef.current}
      />
    </div>
  );
};

export default Template;
