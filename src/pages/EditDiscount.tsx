import { Form, Formik } from "formik";
import React from "react";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditDiscount = () => {
  const { state } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  const EditDiscount = async (values: FormData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/discount/scheme/${state.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/discounts`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
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
          onSubmit={(values) => {
            const formData = getFormData(values);
            EditDiscount(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-500">
                    Discount Scheme Information
                  </p>
                  <div
                    className="border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                    onClick={() => {
                      const val = { ...values, enabled: !values.enabled };
                      const formData = getFormData(val);
                      EditDiscount(formData);
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

export default EditDiscount;
