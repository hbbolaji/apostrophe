import React, { useState } from "react";
import { Form, Formik } from "formik";
import Input from "./Input";
import Select from "./Select";

const InvoiceTemplate = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Create (Edit) Invoice
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            studentName: "",
            courseName: "",
            issuedOn: "",
            validTill: "",
            paymentPlan: "",
            currency: "",
            itemDescription: "",
            discount: "",
            status: "",
            amount: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col xl:flex-row space-y-5 xl:space-y-0  xl:space-x-5 block w-full">
              {step === 0 ? (
                <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                  <p className="font-semibold text-gray-500">
                    Recipient Information
                  </p>
                  <Select
                    data={["Abu", "Ali", "Ahmad"]}
                    name="studentName"
                    placeholder="Student Name"
                    value={values.studentName}
                    onChange={handleChange}
                  />
                  <Select
                    data={["Course 1", "Course 2", "Course 3"]}
                    name="courseName"
                    placeholder="Course Name"
                    value={values.courseName}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Issued On"
                    name="issuedOn"
                    value={values.issuedOn}
                    onChange={handleChange}
                    type="date"
                  />
                  <Input
                    placeholder="Valid Till"
                    name="validTill"
                    value={values.validTill}
                    onChange={handleChange}
                    type="date"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
              {step === 1 ? (
                <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                  <p className="font-semibold text-gray-500">
                    Billing Information
                  </p>
                  <Select
                    data={["Plan 1", "Plan 2", "Plan 3"]}
                    name="paymentPlan"
                    placeholder="Payment Plan"
                    value={values.paymentPlan}
                    onChange={handleChange}
                  />
                  <Select
                    data={["USD", "TRY", "SAR"]}
                    name="currency"
                    placeholder="Currency"
                    value={values.currency}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Amount"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    type="text"
                  />
                  <Input
                    placeholder="Description"
                    name="itemDescription"
                    value={values.itemDescription}
                    onChange={handleChange}
                    type="text"
                  />
                  <Select
                    data={["Discount 1", "Discount 2", "Discount 3"]}
                    name="discount"
                    placeholder="Discount"
                    value={values.discount}
                    onChange={handleChange}
                  />
                  <Select
                    data={["Paid", "Pending", "Invalid"]}
                    name="status"
                    placeholder="Status"
                    value={values.status}
                    onChange={handleChange}
                  />
                  <div className="flex space-x-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="text-sm md:text-base block px-5 bg-orange-500 text-white py-1.5 rounded-full font-semibold"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
