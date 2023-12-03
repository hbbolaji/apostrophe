import React from "react";

const Guardian: React.FC<{ guardian: any }> = ({ guardian }) => {
  return (
    <div className="px-4 py-3 space-y-3">
      <div>
        <p className="text-lg font-semibold">
          {guardian.firstName} {guardian.lastName}
        </p>
        <p className="text-sm font-semibold text-gray-500">
          {guardian.emailAddress}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">lives {guardian.residence}</p>
        <p className="text-sm font-semibold text-gray-500">
          nationality {guardian.nationality}
        </p>
      </div>
      <div>
        {/* <p className="text-sm">phone {guardian.phoneNumber}</p> */}
        <p className="text-sm font-semibold">phone {guardian.phoneNumber}</p>
        <p className="text-sm font-semibold text-gray-500">
          whatsapp {guardian.whatsappNumber}
        </p>
      </div>
    </div>
  );
};

export default Guardian;
