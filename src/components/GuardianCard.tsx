import React from "react";
import {
  PiEnvelopeThin,
  PiFlagThin,
  PiMapPinThin,
  PiNotePencilThin,
  PiPersonLight,
  PiPhoneCallThin,
  PiPhoneThin,
  PiWhatsappLogoThin,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuardianCard: React.FC<{ guardian: any }> = ({ guardian }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const role = currentUser.role;
  return (
    <div className="px-5 py-3 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-center">Guardian Info</p>
        {role === "sales" ? (
          <div>
            <div
              className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate(`/dashboard/guardians/edit/${guardian.id}`, {
                  state: guardian,
                });
              }}
            >
              <div>
                <PiNotePencilThin className="text-orange-500" />
              </div>
              <p className="text-sm  text-orange-500">Edit</p>
            </div>
            {!guardian ? (
              <div
                className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/guardians/add", {
                    state: guardian.studentId,
                  });
                }}
              >
                <PiPersonLight className="text-orange-500" />
                <span className="text-sm text-orange-500">Add Guardian</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="text-sm text-gray-500">
        <p className="">{guardian.relationshipStudent}</p>
        <p className="border border-1 border-gray-300 rounded-lg px-4 py-2">
          {guardian.firstName} {guardian.lastName}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiMapPinThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.residence}
          </p>
        </div>
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiFlagThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.nationality}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiEnvelopeThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.emailAddress}
          </p>
        </div>
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiWhatsappLogoThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.whatsappNumber}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiPhoneCallThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.contactNumber}
          </p>
        </div>
        <div className="flex items-center space-x-4 border border-1 border-gray-300 rounded-lg px-4 py-2 w-full">
          <PiPhoneThin className="" />
          <p className="text-sm text-gray-500 font-semibold">
            {guardian.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuardianCard;
