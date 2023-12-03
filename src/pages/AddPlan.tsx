import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getFormData } from "../utils/helper";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";

const AddPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState<any>([]);
  const createPaymentPlan = async (
    values: FormData,
    discountSchemeId: string
  ) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/${discountSchemeId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/plans`);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscounts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/discount/scheme/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setDiscounts(selectData(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiscounts();
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

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
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
          onSubmit={(values) => {
            const formData = getFormData(values);
            createPaymentPlan(formData, values.discountSchemeId);
          }}
        >
          {({ values, handleChange }) => (
            <Form className=" space-y-5 block w-full">
              <div className="p-5 bg-white rounded-lg shadow-lg w-5/6 xl:w-1/2 mx-auto space-y-5">
                <p className="font-semibold text-gray-500">
                  Payment Plan Information
                </p>
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
