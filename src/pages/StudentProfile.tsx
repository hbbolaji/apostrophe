import React, { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import GuardianCard from "../components/GuardianCard";
import InvoiceCard from "../components/InvoiceCard";
import PaymentCard from "./PaymentCard";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [guardian, setGuardian] = useState<any>(null);
  const [student, setStudent] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>(null);
  const [payments, setPayments] = useState<any>(null);

  const getGuardian = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setGuardian(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudetnById = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setStudent(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvoiceByStudentId = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/invoice/all/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setInvoice(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentsById = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payments/made/all/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setPayments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/me");
    }
    getStudetnById();
    getGuardian();
    getInvoiceByStudentId();
    getPaymentsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-8 pb-8 px-5 w-full space-y-6">
      <StudentCard {...student} />
      <div className="flex">
        <div className="grid grid-cols-3 w-full gap-4">
          <div className="col-span-3 xl:col-span-2 h-96 bg-white shadow-xl rounded-lg p-4 w-full ">
            {invoice ? <InvoiceCard invoice={invoice} /> : null}
          </div>
          <div className="col-span-3 xl:col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            {payments ? <PaymentCard payments={payments} /> : null}
          </div>
          <div className="col-span-3 xl:col-span-2  bg-white shadow-xl rounded-lg p-4 w-full">
            {guardian ? (
              <GuardianCard guardian={{ ...guardian, studentId: student.id }} />
            ) : (
              <p>No guardian yet</p>
            )}
          </div>
          <div className="col-span-3 xl:col-span-1 h-96 bg-white shadow-xl rounded-lg p-4 w-full">
            TimeTable
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
