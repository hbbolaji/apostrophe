import React from "react";

type CheckBoxType = {
  label: string;
  value: string;
  handleChange: (value: string) => void;
  checked?: boolean;
  name: string;
};

const Checkbox: React.FC<CheckBoxType> = ({
  label,
  checked,
  value,
  handleChange,
  name,
}) => {
  return (
    <div>
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          className="accent-orange-500"
          onChange={() => handleChange(value)}
          name={name}
          value={value}
          checked={checked}
          id=""
        />{" "}
        <span className="text-gray-500">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
