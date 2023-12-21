import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Select from "../components/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFormData } from "../utils/helper";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { getCourses } from "../api/course";
import { getPlans } from "../api/plan";
import { createInvoice } from "../api/invoice";
import Toast from "../components/Toast";
import ButtonSpinner from "../components/ButtonSpinner";
import moment from "moment";

const AddInvoice = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);
  const [plansData, setPlansData] = useState<any>([]);
  const [issuanceError, setIssuanceError] = useState<boolean>(false);
  const [validityError, setValidityError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [issuanceDate, setIssuanceDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [validityDate, setValidityDate] = useState<DateValueType>({
    startDate: null,
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

  const courseString = (val: any) =>
    `${val.courseCode} ------ [${moment(val.startDate).format(
      "MMM Do YY"
    )} - ${moment(val.endDate).format("MMM Do YY")}]`;
  const instalmentString = (val: any) =>
    `${val.totalFees} payable in ${val.noOfInstalments} Installments`;

  const selectData = (value: any) => {
    return value.map((val: any) => ({
      title: `${val.courseTitle ? courseString(val) : instalmentString(val)}`,
      value: val.id,
      amount: val.totalFees || val.amount,
    }));
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
      const result: any = await createInvoice(
        token,
        state,
        formData,
        values.courseId,
        values.paymentPlanId
      );
      if (result?.status === 200 || result?.statusText === "OK") {
        setLoading(false);
        navigate(`/dashboard/students/${state}`);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const courseResult = await getCourses(token);
      const plansResult = await getPlans(token);
      if (courseResult.data) {
        setCourses(selectData(courseResult.data));
      } else {
        navigate(`/dashboard/students/${state}`);
      }
      if (plansResult.data) {
        setPlans(selectData(plansResult.data));
      } else {
        navigate(`/dashboard/students/${state}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5 md:pt-8">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Create Invoice
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
            studentId: state,
            courseId: "",
            paymentPlanId: "",
            status: "Unpaid",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Recipient Information
                </p>
                <Select
                  dataObj={courses}
                  name="courseId"
                  placeholder="Course Name"
                  value={values.courseId}
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    const chosenCourse = courses.find(
                      (course: any) => course.value === Number(e.target.value)
                    );
                    const availablePlans = plans.filter(
                      (plan: any) => plan.amount === chosenCourse.amount
                    );
                    if (availablePlans.length > 0) {
                      setPlansData(availablePlans);
                    } else {
                      setPlansData([
                        {
                          title: "No payment plan available for this course",
                          value: "",
                        },
                      ]);
                    }
                  }}
                />
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">
                    Issuance Date
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
                    Validity Date
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
                <Select
                  dataObj={plansData}
                  name="paymentPlanId"
                  placeholder="Payment Plan"
                  value={values.paymentPlanId}
                  onChange={handleChange}
                />
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

export default AddInvoice;

const validationSchema = yup.object().shape({
  courseId: yup.string().required("Course is required"),
  paymentPlanId: yup.string().required("Payment plan is required"),
});
