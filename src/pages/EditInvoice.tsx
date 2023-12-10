import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as yup from "yup";
import { getFormData } from "../utils/helper";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import moment from "moment";
import { updateInvoice } from "../api/invoice";
import Toast from "../components/Toast";
import ButtonSpinner from "../components/ButtonSpinner";

const EditInvoice = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [issuanceError, setIssuanceError] = useState<boolean>(false);
  const [validityError, setValidityError] = useState<boolean>(false);
  const [issuanceDate, setIssuanceDate] = useState<DateValueType>({
    startDate: state.IssuanceDate,
    endDate: null,
  });
  const [validityDate, setValidityDate] = useState<DateValueType>({
    startDate: state.validityDate,
    endDate: null,
  });

  const handleIssuanceDate = (newValue: DateValueType) => {
    setIssuanceError(false);
    setIssuanceDate(newValue);
  };

  const handleValidityDate = (newValue: DateValueType) => {
    setValidityError(false);
    setValidityDate(newValue);
  };

  const handleSubmit = async (values: any) => {
    if (issuanceDate?.startDate === null) {
      setIssuanceError(true);
    }
    if (validityDate?.startDate === null) {
      setValidityError(true);
    }
    setLoading(true);
    if (issuanceDate?.startDate !== null && validityDate?.startDate !== null) {
      const formData = getFormData({
        ...values,
        issuanceDate: issuanceDate?.startDate || "",
        validityDate: validityDate?.startDate || "",
      });
      const result: any = await updateInvoice(token, state.id, formData);
      if (result?.status === 200 || result?.statusText === "OK") {
        setLoading(false);
        navigate(`/dashboard/students/${state.studentId}`);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Invoice
      </h4>
      {error ? (
        <Toast
          message="cannot add new course now"
          close={() => {
            setError(false);
          }}
          show={error}
          type="error"
        />
      ) : null}
      <div className="w-full">
        <Formik
          initialValues={{
            studentId: state.studentId || "",
            courseId: state.courseId,
            paymentPlanId: state.courseId,
            status: state.status || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
                  {issuanceError ? (
                    <p className="text-xs px-5 text-red-500">
                      Issuance date is required
                    </p>
                  ) : null}
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
                  {validityError ? (
                    <p className="text-xs px-5 text-red-500">
                      Validity date is required
                    </p>
                  ) : null}
                </div>
                <div className="flex justify-end items-center space-x-4">
                  <button
                    type="submit"
                    className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                  >
                    Submit
                  </button>
                  {loading ? <ButtonSpinner /> : null}
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

const validationSchema = yup.object().shape({
  courseId: yup.string().required("Course is required"),
  paymentPlanId: yup.string().required("Payment plan is required"),
});
