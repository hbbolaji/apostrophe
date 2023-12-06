import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { editDiscount } from "../api/discount";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";

const EditDiscount = () => {
  const { state } = useLocation();
  const { token } = useAuth();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = getFormData(values);
    const result: any = await editDiscount(token, state.id, formData);
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);
      navigate("/dashboard/discounts");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8">
      <div>
        <h4 className="text-orange-400 font-semibold text-center text-2xl">
          Edit Discount Scheme
        </h4>
      </div>
      <div className="w-full">
        <Formik
          initialValues={{
            discountTitle: state.discountTitle || "",
            discountValue: state.discountValue || "",
            notes: state.notes || "",
            enabled: state.enabled,
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-500">
                    Discount Scheme Information
                  </p>
                  {error ? (
                    <Toast
                      message="cannot edit discount scheme now"
                      close={() => {
                        setError(false);
                      }}
                      show={error}
                      type="error"
                    />
                  ) : null}
                  <div
                    className="border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                    onClick={() => {
                      const val = { ...values, enabled: !values.enabled };
                      handleSubmit(val);
                    }}
                  >
                    <p className="text-sm  text-orange-500">
                      {values.enabled ? "Disable Discount" : "Enable Discount"}
                    </p>
                  </div>
                </div>
                <Input
                  placeholder="Discount Title"
                  name="discountTitle"
                  value={values.discountTitle}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Discount Value"
                  name="discountValue"
                  value={values.discountValue}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Notes"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  type="text"
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

export default EditDiscount;
const validationSchema = yup.object().shape({
  discountTitle: yup.string().required("Discount Title is required"),
  discountValue: yup.string().required("Discount Value is required"),
  notes: yup.string().required("Discount Note is required"),
});
