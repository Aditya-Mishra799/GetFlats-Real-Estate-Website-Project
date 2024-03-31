import React from "react";

const CustomInput = ({ value, setValue }) => {
  return (
    <input
      placeholder="Enter search keywords"
      className="w-full border-2  border-highlight-orange px-2 py-1 rounded-md focus:outline-2 focus:outline-active-orange"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
