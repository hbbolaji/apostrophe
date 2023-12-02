import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  PiNotePencilThin,
  PiPhoneCallThin,
  PiPhoneThin,
  PiPlusThin,
  PiSpeakerLowThin,
  PiStarFill,
  PiWhatsappLogoThin,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { UserType } from "../utils/types";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC<UserType> = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = currentUser;

  let config = genConfig(props.emailAddress);
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-4">
          <div className="h-24 w-24">
            <Avatar className="h-24 w-24 rounded-full" {...config} sex="man" />
          </div>
          <div className="text-left">
            <p className="text-lg flex items-center space-x-3">
              <span>
                {props.firstName} {props.lastName}
              </span>{" "}
              <PiStarFill
                className={`${
                  props.status === "active" ? "text-green-500" : "text-gray-500"
                }`}
              />
            </p>
            <p className="text-sm text-gray-400">{props.emailAddress}</p>
            <p className="text-sm text-gray-400">{props.gender}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <PiPhoneCallThin className="text-lg" />
            <p className="text-gray-500 text-sm">{props.contactNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiWhatsappLogoThin className="text-lg" />
            <p className="text-gray-500 text-sm">{props.whatsappNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiPhoneThin className="text-lg" />
            <p className="text-gray-500 text-sm">{props.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-4">
            <PiSpeakerLowThin className="text-lg" />
            <p className="text-gray-500 text-sm">{props.spokenLanguage}</p>
          </div>
        </div>
        <div className="space-y-4">
          {role === "sales" ? (
            <div
              className="flex items-center justif-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate("/dashboard/me/edit");
              }}
            >
              <PiNotePencilThin className="text-orange-500" />
              <span className="text-sm text-orange-500">Edit Profile</span>
            </div>
          ) : null}
          {role === "sales" ? (
            <div
              className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
              onClick={() => {
                navigate("/dashboard/students/add");
              }}
            >
              <PiPlusThin className="text-orange-500" />
              <span className="text-sm text-orange-500">Add Student</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
