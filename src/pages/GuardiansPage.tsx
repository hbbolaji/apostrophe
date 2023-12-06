import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Guardian from "../components/Guardian";
import { getGuardians } from "../api/guardian";
import Spinner from "../components/Spinner";

const GuardiansPage = () => {
  const [guardians, setGuardians] = useState<any[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: any = await getGuardians(token);
      if (result.data) {
        setLoading(false);
        setGuardians(result.data);
      } else {
        setLoading(false);
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {error ? (
        <p className="text-center py-24">Error Loading list of Students</p>
      ) : null}
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default GuardiansPage;
