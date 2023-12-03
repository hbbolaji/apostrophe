import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Guardian from "../components/Guardian";

const GuardiansPage = () => {
  const [guardians, setGuardians] = useState<any[]>([]);
  const { token } = useAuth();

  const getGuardians = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/guardian/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await result;
      setGuardians(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuardians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(guardians);

  return (
    <div className="w-full md:pt-8 px-5 space-y-5">
      <p className="text-xl font-semibold px-5">Guardians</p>
      <div className="flex flex-wrap">
        {guardians.map((guardian) => (
          <div
            key={guardian.id}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
          >
            <div className="bg-white shadow-lg rounded-lg">
              <Guardian guardian={guardian} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuardiansPage;
