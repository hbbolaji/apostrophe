import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePaymentPlan } from "../api/plan";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";
import { PiXLight } from "react-icons/pi";

const EditPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const result: any = await updatePaymentPlan(token, state.id, values);
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);
      navigate(`/dashboard/plans`);
    } else {
      setErrorMsg("Unable to edit this plan at the moment");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/dashboard/plans");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5 md:pt-8">
      <h4 className="text-orange-400 font-semibold text-center text-2xl">
        Edit Payment Plans
      </h4>

      <div className="w-full">
        <Formik
          initialValues={{
            totalFees: state.totalFees || "",
            noOfInstalments: state.noOfInstalments || "",
            instalmentPortions: state.instalmentPortions || [],
            notes: state.notes || "",
            enabled: true,
            discountSchemeId: state.discountSchemeId,
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            const accum = values.instalmentPortions.reduce(
              (acc: any, curr: any) => acc + Number(curr.portion),
              0
            );
            const discount =
              (100 - state.discountSchemeResponse.discountValue) / 100;
            const discountedAmount = discount * Number(values.totalFees);
            if (discountedAmount === accum) {
              handleSubmit(values);
            } else if (
              Number(values.noOfInstalments) !==
              values.instalmentPortions.length
            ) {
              setErrorMsg("Number of instalments doesn't match");
              setError(true);
            } else {
              setErrorMsg(
                `Sum of instalments amounts should be equal to the $ ${discountedAmount}`
              );
              setError(true);
            }
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
                      message={errorMsg}
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
                      {values.enabled ? "Disable Plan" : "Enable Plan"}
                    </p>
                  </div>
                </div>
                <Input
                  placeholder="Total Fee"
                  name="totalFees"
                  value={values.totalFees}
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                  }}
                  type="number"
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
                            status: "unpaid",
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

export default EditPlans;

const validationSchema = yup.object().shape({
  totalFees: yup.number().required("total fee is required"),
  noOfInstalments: yup.number().required("number of instalments is required"),
  instalmentPortions: yup.array().of(
    yup.object().shape({
      portion: yup.string().required("portion is required"),
      date: yup.string().required("portion date is required"),
      portionId: yup.string(),
    })
  ),
  notes: yup.string().required("notes is required"),
});
