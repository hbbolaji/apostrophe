import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { v4 as uuid } from "uuid";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { getDiscounts } from "../api/discount";
import { createPaymentPlan } from "../api/plan";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";
import { PiXLight } from "react-icons/pi";

const AddPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState<any>([]);
  const [afterDiscount, setAfterDiscount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const result = await getDiscounts(token);
      if (result.data) {
        setDiscounts(selectData(result.data));
      } else {
        setErrorMsg("No discounts create discounts first");
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectData = (value: any) => {
    return value
      .filter((valu: any) => valu.enabled)
      .map((val: any) => ({
        title: val.discountTitle,
        value: val.id,
        amount: val.discountValue,
      }));
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const result: any = await createPaymentPlan(
      token,
      values,
      values.discountSchemeId
    );
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);
      navigate(`/dashboard/plans`);
    } else {
      setErrorMsg("Unable to add a plan at the moment");
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 md:pt-8">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Add Payment Plans
      </h4>
      <div className="w-full">
        <Formik
          initialValues={{
            totalFees: "",
            noOfInstalments: "",
            instalmentPortions: [],
            notes: "",
            enabled: true,
            discountSchemeId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            const accum = values.instalmentPortions.reduce(
              (acc: any, curr: any) => acc + Number(curr.portion),
              0
            );
            if (afterDiscount === accum) {
              handleSubmit(values);
            } else if (
              Number(values.noOfInstalments) !==
              values.instalmentPortions.length
            ) {
              setErrorMsg("Number of instalments doesn't match");
              setError(true);
            } else {
              setErrorMsg(
                `Sum of instalments amounts should be equal to the $ ${afterDiscount}`
              );
              setError(true);
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-11/12 md:w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Payment Plan Information
                </p>
                {error ? (
                  <Toast
                    message={errorMsg}
                    close={() => {
                      setError(false);
                    }}
                    show={error}
                    type="error"
                  />
                ) : null}
                <p className="font-semibold p-2 text-center border border-2 border-orange-500 rounded-lg">
                  Discounted Amount: {afterDiscount}
                </p>
                <Input
                  placeholder="Total Fee"
                  name="totalFees"
                  value={values.totalFees}
                  onChange={handleChange}
                  type="number"
                />
                <Select
                  dataObj={discounts}
                  name="discountSchemeId"
                  placeholder="Discount Scheme"
                  value={values.discountSchemeId}
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    const discountValue = discounts.find(
                      (discount: any) =>
                        discount.value === Number(e.target.value)
                    );
                    const discount = (100 - discountValue.amount) / 100;
                    const discountedAmount =
                      discount * Number(values.totalFees);
                    setAfterDiscount(discountedAmount);
                  }}
                />
                <Input
                  placeholder="Number of Installments"
                  name="noOfInstalments"
                  value={values.noOfInstalments}
                  onChange={handleChange}
                  type="number"
                />
                <FieldArray name="instalmentPortions">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      <p className="block text-xs md:text-sm text-gray-700 dark:text-gray-300">
                        Instalment Portions
                      </p>
                      {values.instalmentPortions.map(
                        (sub: any, index: number) => {
                          const portion = `instalmentPortions[${index}].portion`;
                          const date = `instalmentPortions[${index}].date`;
                          return (
                            <div
                              key={sub.id}
                              className="flex items-center space-x-2"
                            >
                              <div className="flex-1">
                                <div className="flex w-full items-end space-x-4">
                                  <Input
                                    placeholder="Installment Portion"
                                    name={portion}
                                    hidelabel="true"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    placeholder="Date"
                                    name={date}
                                    hidelabel="true"
                                    onChange={handleChange}
                                    type="date"
                                  />
                                </div>
                              </div>
                              <PiXLight
                                className="text-3xl cursor-pointer text-gray-600 dark:text-gray-200"
                                onClick={() => remove(index)}
                              />
                            </div>
                          );
                        }
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            portionId: uuid(),
                            portion: "",
                            date: "",
                          })
                        }
                        className="w-full flex justify-center text-sm md:text-base text-center py-2 px-4 md:py-2 md:px-2 text-orange-500 rounded-full bg-slate-200 flex items-center font-semibold"
                      >
                        + Add an Instalment Portion
                      </button>
                    </div>
                  )}
                </FieldArray>

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

export default AddPlans;

const validationSchema = yup.object().shape({
  totalFees: yup.number().required("total fee is required"),
  noOfInstalments: yup.number().required("number of instalments is required"),
  discountSchemeId: yup.string().required("discount scheme is required"),
  instalmentPortions: yup.array().of(
    yup.object().shape({
      portion: yup.string().required("portion is required"),
      date: yup.string().required("portion date is required"),
      portionId: yup.string(),
    })
  ),
  notes: yup.string().required("notes is required"),
});
