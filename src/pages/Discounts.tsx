import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { PiPlusThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Discount from "../components/Discount";
import { getDiscounts } from "../api/discount";
import Spinner from "../components/Spinner";

const Discounts = () => {
  const { token } = useAuth();
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await getDiscounts(token);
      if (result.data) {
        setLoading(false);
        setDiscounts(result.data);
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
        <p className="text-2xl">Discount Schemes</p>
        <PiPlusThin
          className="text-2xl cursor-pointer"
          onClick={() => {
            navigate("/dashboard/discounts/add");
          }}
        />
      </div>
      <div className="flex flex-wrap">
        {discounts.map((discount) => (
          <div
            key={discount.id}
            className="w-full sm:w-1/2 xl:w-1/3  2xl:w-1/4 p-3"
          >
            <Discount discount={discount} />
          </div>
        ))}
      </div>
      {error ? (
        <p className="text-center py-24">No discount schemes available</p>
      ) : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default Discounts;
