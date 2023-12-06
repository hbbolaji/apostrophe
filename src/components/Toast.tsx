import React from "react";
import { PiXBold } from "react-icons/pi";

type ToastType = {
  message: string;
  close?: () => void;
};

const Toast: React.FC<ToastType> = ({ message, close }) => {
  return (
    <div className="relative md:w-1/2 mx-auto py-2 px-4 bg-orange-500 rounded-lg">
      <p className="text-center font-semibold text-white">
        can't add a new course now
      </p>
      <PiXBold
        onClick={close}
        className="cursor-pointer bg-orange-100 rounded-full text-red-500 absolute -top-1 -right-1"
      />
    </div>
  );
};

export default Toast;
