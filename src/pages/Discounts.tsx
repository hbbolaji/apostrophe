import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { PiPlusThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Discount from "../components/Discount";

const Discounts = () => {
  const { token } = useAuth();
  const [discounts, setDiscounts] = useState<any[]>([]);
  const navigate = useNavigate();
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
      setDiscounts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiscounts();
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
            className="w-full sm:w-1/2 md:w-1/3  2xl:w-1/4 p-3"
          >
            <Discount discount={discount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
