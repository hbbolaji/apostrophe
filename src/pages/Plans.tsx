import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { PiPlusThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Plan from "../components/Plan";
import { getPlans } from "../api/plan";
import Spinner from "../components/Spinner";

const Discounts = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getPlans(token);
      if (result.data) {
        setLoading(false);
        setPlans(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
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
      {error ? (
        <p className="text-center py-24">No Payment Plans available</p>
      ) : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default Discounts;
