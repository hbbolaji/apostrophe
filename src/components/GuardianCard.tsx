import React from "react";
import {
  PiEnvelopeThin,
  PiFlagThin,
  PiMapPinThin,
  PiNotePencilThin,
  PiPhoneCallThin,
  PiPhoneThin,
  PiWhatsappLogoThin,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const GuardianCard: React.FC<{ guardian: any }> = ({ guardian }) => {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-3 space-y-4">
      <p className="font-semibold text-lg text-center">Guardian Info</p>
      <div>
        <p className="text-center text-2xl font-semibold text-gray-500">
          {guardian.firstName} {guardian.lastName}
        </p>
        <p className="text-center text-sm text-gray-500">
          {guardian.relationshipStudent}
        </p>
      </div>
      <div
        className="flex w-full items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
        onClick={() => {
          navigate(`/dashboard/guardians/edit/${guardian.id}`, {
            state: guardian,
          });
        }}
      >
        <div>
          <PiNotePencilThin className="text-orange-500" />
        </div>
        <p className="text-sm  text-orange-500">Edit Guardian</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <PiMapPinThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.residence}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <PiFlagThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.nationality}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center space-y-2">
          <PiEnvelopeThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.emailAddress}
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <PiWhatsappLogoThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.whatsappNumber}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center space-y-2">
          <PiPhoneCallThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.contactNumber}
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <PiPhoneThin className="text-3xl" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuardianCard;
