import React, { useEffect, useState } from "react";
import {
  PiNotePencilLight,
  PiPhoneCallLight,
  PiPhoneLight,
  PiSpeakerLowLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { StudentType } from "../utils/types";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

type Props = { student: StudentType; hasGuardian: boolean; portions: any[] };
const StudentCard: React.FC<Props> = ({ student, hasGuardian, portions }) => {
  const { currentUser } = useAuth();
  const role = currentUser.role;
  const navigate = useNavigate();
  const [nextPayment, setNextPayment] = useState<any[]>([]);
  useEffect(() => {
    setNextPayment(
      portions
        .filter((port: any) => port.status === "unpaid")
        .sort((a: any, b: any) => moment(a.date).diff(b.date))
    );
  }, [portions]);
  const hasNextPayment = portions.some(
    (portion: any) => portion.status === "paid"
  );
  return (
    <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
      <div className="w-full sm:w-1/2 lg:w-2/3 bg-white rounded shadow-lg p-8">
        <div className="text-left space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold space-x-3">
              {student.firstName} {student.lastName}
            </p>
            <div className="flex items-center justify-between">
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
                    <PiNotePencilLight className="text-orange-500" />
                    <span className="hidden lg:block text-sm text-orange-500">
                      Edit Profile
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <p className="text-sm text-gray-400">{student.emailAddress}</p>
          <p className="text-sm text-gray-400">{student.gender}</p>
          <p className="text-sm text-gray-600 font-semibold">
            {hasNextPayment
              ? `Next Payment: ${moment(nextPayment[0]?.date).format(
                  "MMM Do YYYY"
                )}`
              : "No upcoming payment"}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 bg-white rounded shadow-lg px-8 py-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <PiPhoneCallLight className="text-lg" />
            <p className="text-gray-500 font-semibold text-sm">
              {student.contactNumber}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <PiWhatsappLogoLight className="text-lg" />
            <p className="text-gray-500 font-semibold text-sm">
              {student.whatsappNumber}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <PiPhoneLight className="text-lg" />
            <p className="text-gray-500 font-semibold text-sm">
              {student.phoneNumber}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <PiSpeakerLowLight className="text-lg" />
            <p className="text-gray-500 font-semibold text-sm">
              {student.spokenLanguage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
