import { Form, Formik } from "formik";
import React, { useState } from "react";
import { getFormData } from "../utils/helper";
import * as yup from "yup";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createDiscount } from "../api/discount";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";

const AddDiscounts = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = getFormData(values);
    const result: any = await createDiscount(token, formData);
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
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add Discount Scheme
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            discountTitle: "",
            discountValue: "",
            notes: "",
            enabled: true,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              {error ? (
                <Toast
                  message="cannot add new discount scheme now"
                  close={() => {
                    setError(false);
                  }}
                  show={error}
                  type="error"
                />
              ) : null}
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Discount Scheme Information
                </p>
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
                <div className="flex items-center space-x-4 justify-end">
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

export default AddDiscounts;

const validationSchema = yup.object().shape({
  discountTitle: yup.string().required("Discount Title is required"),
  discountValue: yup.string().required("Discount Value is required"),
  notes: yup.string().required("Discount Note is required"),
});
