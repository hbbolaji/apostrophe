import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Freecurrencyapi from "../utils/exchange";
import { useAuth } from "../context/AuthContext";
import { Form, Formik } from "formik";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import Select from "../components/Select";
import { PiCloudArrowUpBold } from "react-icons/pi";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { createPayment } from "../api/invoice";
import Toast from "../components/Toast";
import ButtonSpinner from "../components/ButtonSpinner";

const AddPayment = () => {
  const { state } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDate = (newValue: DateValueType) => {
    setDate(newValue);
  };

  const handleClick = () => {
    ref.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    setFile(e.target.files[0]);
  };

  const selectData = (value: any) => {
    return value
      .filter((val: any) => val.status === "unpaid")
      .map((val: any) => ({
        title: `$ ${val.portion}`,
        value: val.portionId,
      }));
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const freecurrencyapi = new Freecurrencyapi(process.env.REACT_APP_API_KEY);
    const response = await freecurrencyapi.latest({
      base_currency: "USD",
      currencies: values.currency,
    });
    const exchangeRate = Number(Object.values(response.data)[0]).toFixed(2);
    const formData = getFormData({
      ...values,
      exchangeRate,
      date: date?.startDate || "",
    });
    formData.append("receipt", file);
    const result = await createPayment(token, state.id, formData);
    if (result?.success) {
      setLoading(false);
      navigate(`/dashboard/students/${state.studentId}`);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const plans = state.paymentPlanResponse.instalmentPortions;

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add Payment
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            date: "",
            currency: "",
            amountPaid: "",
            medium: "",
            toAccount: "",
            portionId: "",
            notes: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Payment Information
                </p>
                {error ? (
                  <Toast
                    message="cannot add a payment now"
                    close={() => {
                      setError(false);
                    }}
                    show={error}
                    type="error"
                  />
                ) : null}
                <div className="space-y-2">
                  <p className="text-xs md:text-sm px-2 text-gray-600">Date</p>
                  <div
                    className={`flex items-center bg-white border border-1 rounded-full px-5 ${
                      false ? "border-orange-300" : "border-gray-300"
                    }`}
                  >
                    <Datepicker
                      value={date}
                      onChange={handleDate}
                      primaryColor={"orange"}
                      showShortcuts={false}
                      asSingle={true}
                      useRange={false}
                    />
                  </div>
                </div>
                <Select
                  dataObj={selectData(plans)}
                  name="portionId"
                  placeholder="Portion"
                  value={values.portionId}
                  onChange={handleChange}
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

export default AddPayment;

const validationSchema = yup.object().shape({
  currency: yup.string().required("currency is required"),
  amountPaid: yup.string().required("amount is required"),
  medium: yup.string().required("medium of payment is required"),
  toAccount: yup.string().required("this field is required"),
  notes: yup.string().required("notes is required"),
});
