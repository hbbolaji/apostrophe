import React from "react";
import { PiXBold } from "react-icons/pi";

type ToastType = {
  message: string;
  close: () => void;
  type?: string;
  show: boolean;
};

const Toast: React.FC<ToastType> = ({ message, close, show, type }) => {
  setTimeout(() => {
    close();
  }, 3000);
  return (
    <>
      {show ? (
        <div
          className={`relative md:w-1/2 mx-auto py-2 px-4 ${
            type === "error" && "bg-red-200"
          } ${type === "success" && "bg-green-200"} ${
            type === "neurtral" && "bg-orange-200"
          } bg-opacity-60 rounded-lg`}
        >
          <p
            className={`text-center ${type === "error" && "text-red-500"} ${
              type === "success" && "text-green-500"
            } ${type === "neurtral" && "text-orange-500"} font-semibold`}
          >
            {message}
          </p>
          <PiXBold
            onClick={close}
            className="cursor-pointer bg-orange-100 rounded-full text-red-500 absolute -top-1 -right-1"
          />
        </div>
      ) : null}
    </>
  );
};

export default Toast;
