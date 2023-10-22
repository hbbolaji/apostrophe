import { ErrorMessage } from "formik";
import React from "react";

type InputType = {
  name: string;
  type?: string;
  placeholder?: string;
  onChange: any;
  value: string;
};

const Input: React.FC<InputType> = ({ ...props }) => {
  const { name, placeholder } = props;
  return (
    <div className="space-y-2">
      <label id={name} className="text-xs md:text-sm px-2">
        {placeholder}
      </label>
      <input
        {...props}
        autoComplete="off"
        className="block w-full outline-none py-3 px-5 text-sm md:text-base border border-1 border-gray-300 rounded-full bg-white focus:border-orange-500"
      />
      <p className="text-xs px-5 text-red-500">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

export default Input;
