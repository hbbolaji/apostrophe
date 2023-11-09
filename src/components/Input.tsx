import { ErrorMessage } from "formik";
import React from "react";

type InputType = {
  name: string;
  type?: string;
  placeholder?: string;
  onChange: any;
  value: string;
  hidelabel?: boolean;
};

const Input: React.FC<InputType> = ({ ...props }) => {
  const { name, placeholder, hidelabel } = props;
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

      <input
        {...props}
        autoComplete="off"
        id={name}
        className="block w-full outline-none py-3 px-5 text-sm md:text-base border border-1 border-gray-300 rounded-full bg-white focus:border-orange-500"
      />
      <p className="text-xs px-5 text-red-500">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

export default Input;
