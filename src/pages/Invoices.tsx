import React, { useEffect, useState } from "react";
import Invoice from "../components/Invoice";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Invoices = () => {
  const [invoices, setInvoices] = useState<any>([]);
  const { token } = useAuth();

  const getInvoices = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/invoice/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setInvoices(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex space-between w-full">
      <div className="flex-1 space-y-5 md:pt-8 px-5">
        {/* page heading */}
        <div className="flex items-center justify-between py-3">
          <p className="text-2xl">Invoices</p>
        </div>
        {/* Filters */}
        <div></div>
        {/* List of invoices */}
        <div>
          <div className="bg-gray-200 p-4 rounded-t-lg grid grid-cols-6 gap-4">
            <div className="col-span-2">
              <p>Student Name</p>
            </div>
            <div className="col-span-2">
              <p>Validity Date</p>
            </div>
            <div className="col-span-1">
              <p>Amount</p>
            </div>
            <div className="col-span-1">
              <p>Status</p>
            </div>
          </div>
          {invoices.map((inv: any) => (
            <div key={inv.id}>
              <Invoice invoice={inv} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
