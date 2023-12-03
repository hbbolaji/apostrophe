import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const updatePaymentPlan = async (values: FormData) => {
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/${state.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      navigate(`/dashboard/plans`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/dashboard/plans");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
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
          onSubmit={(values) => {
            const formData = getFormData(values);
            updatePaymentPlan(formData);
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
                      updatePaymentPlan(formData);
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

export default EditPlans;
