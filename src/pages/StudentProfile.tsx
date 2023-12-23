import React, { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardianCard from "../components/GuardianCard";
import InvoiceCard from "../components/InvoiceCard";
import PaymentCard from "../components/PaymentCard";
import { getGuardian } from "../api/guardian";
import { getInvoiceByStudentId, getPaymentsById } from "../api/invoice";
import { getStudetnById } from "../api/student";
import Spinner from "../components/Spinner";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [guardian, setGuardian] = useState<any>(null);
  const [student, setStudent] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>(null);
  const [payments, setPayments] = useState<any>(null);
  const [loading, setLoading] = useState({
    guardian: false,
    invoice: false,
    payments: false,
    student: false,
  });
  const [error, setError] = useState({
    guardian: false,
    invoice: false,
    payments: false,
    student: false,
  });

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/me");
    }
    (async () => {
      setLoading({
        guardian: true,
        student: true,
        invoice: true,
        payments: true,
      });
      const studentResult: any = await getStudetnById(token, id as string);
      const guardianResult: any = await getGuardian(token, id as string);
      const invoiceResult: any = await getInvoiceByStudentId(
        token,
        id as string
      );
      const paymentResult: any = await getPaymentsById(token, id as string);

      // students
      if (studentResult.data) {
        setLoading({ ...loading, student: false });
        setStudent(studentResult.data);
      } else {
        setLoading({ ...loading, student: false });
        setError({ ...error, student: true });
      }

      // guardian
      if (guardianResult.data) {
        setLoading({ ...loading, guardian: false });
        setGuardian(guardianResult.data);
      } else {
        setLoading({ ...loading, guardian: false });
        setError({ ...error, guardian: true });
      }

      // invoices
      if (invoiceResult.data) {
        setLoading({ ...loading, invoice: false });
        setInvoice(invoiceResult.data);
      } else {
        setLoading({ ...loading, invoice: false });
        setError({ ...error, invoice: true });
      }

      // payments
      if (paymentResult.data) {
        setLoading({ ...loading, payments: false });
        setPayments(paymentResult.data);
      } else {
        setLoading({ ...loading, payments: false });
        setError({ ...error, payments: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const portions = invoice
    ? invoice.reduce((acc: [], inv: any) => {
        return [...acc, ...inv.invoicePortion];
      }, [])
    : [];

  return (
    <div className="pt-8 pb-8 px-5 w-full space-y-6">
      <StudentCard
        student={student}
        portions={portions}
        hasGuardian={guardian ? true : false}
      />
      <div className="flex">
        <div className="grid grid-cols-3 w-full gap-4">
          <div className="col-span-3 xl:col-span-2 bg-white shadow-xl rounded-lg p-4 w-full ">
            {invoice ? <InvoiceCard invoice={invoice} /> : null}
            {error.invoice ? (
              <p className="text-center py-24">No Invoice sent yet</p>
            ) : null}
            {loading.invoice ? <Spinner /> : null}
          </div>
          <div className="col-span-3 xl:col-span-1  bg-white shadow-xl rounded-lg p-4 w-full">
            {payments ? <PaymentCard payments={payments} /> : null}
            {error.payments ? (
              <p className="text-center py-24">No payments made</p>
            ) : null}
            {loading.payments ? <Spinner /> : null}
          </div>
          <div className="col-span-3 xl:col-span-2  bg-white shadow-xl rounded-lg p-4 w-full">
            {guardian ? (
              <GuardianCard guardian={{ ...guardian, studentId: student.id }} />
            ) : null}
            {error.guardian ? (
              <p className="text-center py-24">No Guardian added yet</p>
            ) : null}
            {loading.guardian ? <Spinner /> : null}
          </div>
          <div className="col-span-3 xl:col-span-1  bg-white shadow-xl rounded-lg p-4 w-full">
            Awaiting course registration
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
