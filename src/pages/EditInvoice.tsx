import React from "react";
import { Form, Formik } from "formik";
import Input from "../components/Input";
import Select from "../components/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { getFormData } from "../utils/helper";

const EditInvoice = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

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
            issuanceDate: state.issuanceDate || "",
            validityDate: state.validityDate || "",
            status: state.status || "",
          }}
          onSubmit={(values) => {
            const formData = getFormData(values);
            updateInvoice(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Recipient Information
                </p>
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

export default EditInvoice;
