import React from "react";

type ToastType = {
  message: string;
};

const Toast: React.FC<ToastType> = ({ message }) => {
  return (
    <div className="absolute top-54 mx-auto w-72 p-4 shadow-lg rounded-lg border-left border-left-2 border-left-green-500">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Toast;
