import React, { useEffect, useState } from "react";
import Invoice from "../components/Invoice";
import { useAuth } from "../context/AuthContext";
import { getInvoices } from "../api/invoice";
import Spinner from "../components/Spinner";

const Invoices = () => {
  const [invoices, setInvoices] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: any = await getInvoices(token);
      if (result.data) {
        setLoading(false);
        setInvoices(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
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
          <div className="hidden bg-gray-200 p-4 rounded-t-lg sm:grid grid-cols-6 gap-4">
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
        {error ? (
          <p className="text-center py-24">Error Loading list of invoices</p>
        ) : null}
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default Invoices;
