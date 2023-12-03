import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Input from "../components/Input";
import Select from "../components/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { getFormData } from "../utils/helper";

const AddInvoice = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);
  const getCourses = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/course/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setCourses(selectData(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPlans = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setPlans(selectData(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const selectData = (value: any) => {
    return value.map((val: any) => ({
      title:
        val.courseTitle ||
        `${val.totalFees} payable in ${val.noOfInstalments} Installments`,
      value: val.id,
    }));
  };

  const createInvoice = async (
    values: FormData,
    courseId: string,
    paymentPlanId: string
  ) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/invoice/${state}/${courseId}/${paymentPlanId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/me`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
    getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Create Invoice
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            studentId: state,
            courseId: "",
            paymentPlanId: "",
            issuanceDate: "",
            validityDate: "",
            status: "",
          }}
          onSubmit={(values) => {
            const formData = getFormData(values);
            console.log(values);
            createInvoice(formData, values.courseId, values.paymentPlanId);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Recipient Information
                </p>
                <Select
                  dataObj={courses}
                  name="courseId"
                  placeholder="Course Name"
                  value={values.courseId}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Issuance Date"
                  name="issuanceDate"
                  value={values.issuanceDate}
                  onChange={handleChange}
                  type="date"
                />
                <Input
                  placeholder="Validity Date"
                  name="validityDate"
                  value={values.validityDate}
                  onChange={handleChange}
                  type="date"
                />
                <Select
                  dataObj={plans}
                  name="paymentPlanId"
                  placeholder="Payment Plan"
                  value={values.paymentPlanId}
                  onChange={handleChange}
                />
                <Select
                  data={["Paid", "Unpaid"]}
                  name="status"
                  placeholder="Status"
                  value={values.status}
                  onChange={handleChange}
                />
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

export default AddInvoice;