import { ErrorMessage } from "formik";
import React from "react";

type SelectType = {
  name: string;
  placeholder?: string;
  onChange: any;
  value: string;
  data?: string[];
  dataObj?: { title: string; value: string }[];
};

const Select: React.FC<SelectType> = ({ ...props }) => {
  const { name, placeholder, data, dataObj } = props;
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-xs md:text-sm px-2 text-gray-600">
        {placeholder}
      </label>
      {data ? (
        <select
          {...props}
          autoComplete="off"
          id={name}
          className="block w-full outline-none py-3 px-5 text-sm md:text-base border border-1 border-gray-300 rounded-full bg-white focus:border-orange-500"
        >
          <option>{placeholder}</option>
          {data.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      ) : null}
      {dataObj ? (
        <select
          {...props}
          autoComplete="off"
          id={name}
          className="block w-full outline-none py-3 px-5 text-sm md:text-base border border-1 border-gray-300 rounded-full bg-white focus:border-orange-500"
        >
          <option>{placeholder}</option>
          {dataObj.map((val) => (
            <option key={val.value} value={val.value}>
              {val.title}
            </option>
          ))}
        </select>
      ) : null}
      <p className="text-xs px-5 text-red-500">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

export default Select;
