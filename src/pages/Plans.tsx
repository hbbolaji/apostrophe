import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { PiPlusThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Plan from "../components/Plan";

const Discounts = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const navigate = useNavigate();
  const getPlans = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/payment/plan/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setPlans(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-5 md:pt-8 px-5">
      <div className="flex items-center justify-between py-3">
        <p className="text-2xl">Payment Plans</p>
        <PiPlusThin
          className="text-2xl cursor-pointer"
          onClick={() => {
            navigate("/dashboard/plans/add");
          }}
        />
      </div>
      <div className="flex flex-wrap">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full sm:w-1/2 md:w-1/3  2xl:w-1/4 p-3"
          >
            <Plan plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
