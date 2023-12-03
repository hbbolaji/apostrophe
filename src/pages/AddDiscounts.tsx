import { Form, Formik } from "formik";
import React from "react";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDiscounts = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const createDiscount = async (values: FormData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/discount/scheme`,
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
          onSubmit={(values) => {
            const formData = getFormData(values);
            createDiscount(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
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

export default AddDiscounts;
