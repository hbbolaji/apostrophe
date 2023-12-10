import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { getFormData } from "../utils/helper";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import moment from "moment";

const EditInvoice = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [issuanceDate, setIssuanceDate] = useState<DateValueType>({
    startDate: state.IssuanceDate,
    endDate: null,
  });
  const [validityDate, setValidityDate] = useState<DateValueType>({
    startDate: state.validityDate,
    endDate: null,
  });

  const handleIssuanceDate = (newValue: DateValueType) => {
    setIssuanceDate(newValue);
  };

  const handleValidityDate = (newValue: DateValueType) => {
    setValidityDate(newValue);
  };

  const updateInvoice = async (values: FormData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/invoice/${state.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/students/${state.studentId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Invoice
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            studentId: state.studentId || "",
            courseId: state.courseId,
            paymentPlanId: state.courseId,
            status: state.status || "",
          }}
          onSubmit={(values) => {
            const formData = getFormData({
              ...values,
              issuanceDate: issuanceDate?.startDate || "",
              validityDate: validityDate?.startDate || "",
            });
            updateInvoice(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Recipient Information
                </p>
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">
                    Issuance Date{" "}
                    <span className="font-semibold">
                      {moment(issuanceDate?.startDate).format("MMM Do YY")}
                    </span>
                  </p>
                  <div
                    className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                      false ? "border-orange-300" : "border-gray-300"
                    }`}
                  >
                    <Datepicker
                      value={issuanceDate}
                      onChange={handleIssuanceDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">
                    Validity Date{" "}
                    <span className="font-semibold">
                      {moment(validityDate?.startDate).format("MMM Do YY")}
                    </span>
                  </p>
                  <div
                    className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                      false ? "border-orange-300" : "border-gray-300"
                    }`}
                  >
                    <Datepicker
                      value={validityDate}
                      onChange={handleValidityDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditInvoice;
