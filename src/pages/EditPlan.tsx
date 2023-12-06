import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePaymentPlan } from "../api/plan";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";

const EditPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = getFormData(values);
    const result: any = await updatePaymentPlan(token, state.id, formData);
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);
      navigate("/dashboard/plans");
    } else {
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
            instalmentPortions: state.instalmentPortions || "",
            notes: state.notes || "",
            enabled: true,
            discountSchemeId: state.discountSchemeId,
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
                      message="cannot edit this payment plan now"
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
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Number of Installments"
                  name="noOfInstalments"
                  value={values.noOfInstalments}
                  onChange={handleChange}
                  type="text"
                />
                <Input
                  placeholder="Installment Portion"
                  name="instalmentPortions"
                  value={values.instalmentPortions}
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

export default EditPlans;

const validationSchema = yup.object().shape({
  totalFees: yup.string().required("total fee is required"),
  noOfInstalments: yup.string().required("number of instalments is required"),
  instalmentPortions: yup.string().required("instalment portions is required"),
  notes: yup.string().required("notes is required"),
});
