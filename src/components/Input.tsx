import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { PiXLight } from "react-icons/pi";

type InputType = {
  name: string;
  type?: string;
  placeholder?: string;
  onChange: any;
  value: string;
  hidelabel?: boolean;
  close?: () => void;
};

const Input: React.FC<InputType> = ({ ...props }) => {
  const [focus, setFocus] = useState(false);
  const { name, placeholder, hidelabel, close, value } = props;
  return (
    <div className="space-y-2">
      {!hidelabel ? (
        <label
          // htmlFor={name}
          htmlFor={name}
          className="text-xs md:text-sm px-2 text-gray-600"
        >
          {placeholder}
        </label>
      ) : null}
      <div
        className={`flex items-center border border-1 rounded-full py-3 px-5 ${
          focus ? "border-orange-300" : "border-gray-300"
        }`}
      >
        <input
          {...props}
          autoComplete="off"
          id={name}
          className="block w-full outline-none text-sm md:text-base"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {close && value !== "" ? (
          <PiXLight
            onClick={close ? () => close() : () => {}}
            className="text-2xl cursor-pointer"
          />
        ) : null}
      </div>
      <p className="text-xs px-5 text-red-500">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

export default Input;
