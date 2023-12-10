import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  PiNotePencilThin,
  PiPersonThin,
  PiPhoneCallThin,
  PiPhoneThin,
  PiPlusThin,
  PiSpeakerLowThin,
  PiStarFill,
  PiWhatsappLogoThin,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { StudentType } from "../utils/types";
import { useAuth } from "../context/AuthContext";

const StudentCard: React.FC<{ student: StudentType; hasGuardian: boolean }> = ({
  student,
  hasGuardian,
}) => {
  const { currentUser } = useAuth();
  const role = currentUser.role;
  let config = genConfig(student.emailAddress);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className=" space-y-4">
          <div className="h-24 w-24">
            <Avatar className="h-24 w-24 rounded-full" {...config} sex="man" />
          </div>
          <div className="text-left">
            <p className="text-lg flex items-center space-x-3">
              <span>
                {student.firstName} {student.lastName}
              </span>{" "}
              <PiStarFill className="text-green-500" />
            </p>
            <p className="text-sm text-gray-400">{student.emailAddress}</p>
            <p className="text-sm text-gray-400">{student.gender}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <PiPhoneCallThin className="text-lg" />
            <p className="text-gray-500 text-sm">{student.contactNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiWhatsappLogoThin className="text-lg" />
            <p className="text-gray-500 text-sm">{student.whatsappNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiPhoneThin className="text-lg" />
            <p className="text-gray-500 text-sm">{student.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiSpeakerLowThin className="text-lg" />
            <p className="text-gray-500 text-sm">{student.spokenLanguage}</p>
          </div>
        </div>
        {role === "sales" ? (
          <div className="space-y-4">
            <div
              className="flex items-center justif-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate(`/dashboard/students/edit/${student.id}`, {
                  state: student,
                });
              }}
            >
              <PiNotePencilThin className="text-orange-500" />
              <span className="text-sm text-orange-500">Edit Profile</span>
            </div>
            <div
              className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate("/dashboard/invoices/add", { state: student.id });
              }}
            >
              <PiPlusThin className="text-orange-500" />
              <span className="text-sm text-orange-500">Add Invoice</span>
            </div>
            {hasGuardian ? null : (
              <div
                className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/guardians/add", { state: student.id });
                }}
              >
                <PiPersonThin className="text-orange-500" />
                <span className="text-sm text-orange-500">Add Guardian</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentCard;
