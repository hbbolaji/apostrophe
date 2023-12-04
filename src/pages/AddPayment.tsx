import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Formik } from "formik";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import Select from "../components/Select";
import axios from "axios";
import { PiCloudArrowUpBold } from "react-icons/pi";

const AddPayment = () => {
  const { state } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();

  const handleClick = () => {
    ref.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    setFile(e.target.files[0]);
  };

  const createPayment = async (values: FormData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payments/made/${state.invoiceId}`,
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
        Add Discount Scheme
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            date: "",
            currency: "",
            amountPaid: "",
            medium: "",
            toAccount: "",
            notes: "",
          }}
          onSubmit={(values) => {
            const formData = getFormData({ ...values });
            formData.append("receipt", file);
            createPayment(formData);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Discount Scheme Information
                </p>
                <Input
                  placeholder="Date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  type="date"
                />
                <Select
                  data={["TRY", "MYR", "USD"]}
                  name="currency"
                  placeholder="Currency"
                  value={values.currency}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Amount Paid"
                  name="amountPaid"
                  value={values.amountPaid}
                  onChange={handleChange}
                  type="text"
                />
                <Select
                  data={["transfer", "cash"]}
                  name="medium"
                  placeholder="Medium"
                  value={values.medium}
                  onChange={handleChange}
                />
                <Select
                  data={["musab", "omar", "khalid"]}
                  name="toAccount"
                  placeholder="To Account"
                  value={values.toAccount}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Notes"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  type="text"
                />
                <div
                  onClick={handleClick}
                  className="flex flex-col items-center space-y-2 p-4 bg-orange-300 bg-opacity-40 rounded-lg cursor-pointer"
                >
                  <PiCloudArrowUpBold className="text-orange-500" />
                  <label
                    className="text-orange-500 font-semibold"
                    htmlFor="receipt"
                  >
                    Upload Button
                  </label>
                  <input
                    name="receipt"
                    ref={ref}
                    type="file"
                    multiple={false}
                    className="hidden"
                    accept="image/*"
                    // value={file}
                    onChange={handleFile}
                  />
                </div>
                {file ? (
                  <p className="text-center text-orange-500 border border-1 rounded-lg border-orange-500 py-2">
                    {file.name}
                  </p>
                ) : null}
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

export default AddPayment;
