import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  PiEnvelopeLight,
  PiNotePencilThin,
  PiPhoneCallThin,
  PiPhoneThin,
  PiPlusThin,
  PiStarFill,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { UserType } from "../utils/types";

const Profile: React.FC<UserType> = (props) => {
  let config = genConfig(props.emailAddress);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-24 w-24">
          <Avatar className="h-24 w-24 rounded-full" {...config} sex="man" />
        </div>
        <div className="space-y-4">
          {props?.role === "sales" ? (
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
          <div
            className="flex items-center justify-center border border-orange-500 rounded-full px-4 py-1 space-x-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/students/add");
            }}
          >
            <PiPlusThin className="text-orange-500" />
            <span className="text-sm text-orange-500">Add Student</span>
          </div>
        </div>
      </div>
      <div className="text-left">
        <p className="text-lg flex items-center space-x-3">
          <span>
            {props.firstName} {props.lastName}
          </span>{" "}
          <PiStarFill className="text-green-500" />
        </p>
        <p className="text-sm text-gray-400">{props.emailAddress}</p>
      </div>
      <div className=" text-3xl flex items-center space-x-4">
        <PiEnvelopeLight
          className="border border-gray-500 rounded p-1 cursor-pointer"
          title={props.emailAddress}
        />
        <PiWhatsappLogoLight className="border border-gray-500 rounded p-1 cursor-pointer" />
        <PiPhoneCallThin className="border border-gray-500 rounded p-1 cursor-pointer" />
        <PiPhoneThin className="border border-gray-500 rounded p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default Profile;
