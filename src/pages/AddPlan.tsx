import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getFormData } from "../utils/helper";
import * as yup from "yup";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { getDiscounts } from "../api/discount";
import { createPaymentPlan } from "../api/plan";
import ButtonSpinner from "../components/ButtonSpinner";
import Toast from "../components/Toast";

const AddPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const result = await getDiscounts(token);
      setDiscounts(selectData(result.data));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectData = (value: any) => {
    return value
      .filter((valu: any) => valu.enabled)
      .map((val: any) => ({
        title: val.discountTitle,
        value: val.id,
      }));
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = getFormData(values);
    const result: any = await createPaymentPlan(
      token,
      formData,
      values.discountSchemeId
    );
    if (result?.status === 200 || result?.statusText === "OK") {
      setLoading(false);

      navigate(`/dashboard/plans`);
    } else {
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
            instalmentPortions: "",
            notes: "",
            enabled: true,
            discountSchemeId: "",
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
                  Payment Plan Information
                </p>
                {error ? (
                  <Toast
                    message="cannot add new payment plan now"
                    close={() => {
                      setError(false);
                    }}
                    show={error}
                    type="error"
                  />
                ) : null}
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
                <Select
                  dataObj={discounts}
                  name="discountSchemeId"
                  placeholder="Discount Scheme"
                  value={values.discountSchemeId}
                  onChange={handleChange}
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
  totalFees: yup.string().required("total fee is required"),
  noOfInstalments: yup.string().required("number of instalments is required"),
  instalmentPortions: yup.string().required("instalment portions is required"),
  notes: yup.string().required("notes is required"),
});
