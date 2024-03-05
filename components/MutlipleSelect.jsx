import React, { useState } from "react";

const MutlipleSelect = ({ label, options, className, ...rest }) => {
  const { name, control, onChange, value, errors, ...remaining } = rest;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [unselectedOptions, setUnselectedOptions] = useState(options);
  const handleSelectChange = (e) => {
    const selectedOption = JSON.parse(e.target.value);
    setSelectedOptions([...selectedOptions, selectedOption]);
    onChange([...selectedOptions, selectedOption]);
    setUnselectedOptions(
      unselectedOptions.filter(
        (option) => option.label !== selectedOption.label
      )
    );
  };

  const removeOption = (option) => {
    setUnselectedOptions([...unselectedOptions, option]);
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.label !== option.label
    )
    setSelectedOptions(
      updatedOptions
    );
    onChange(
      updatedOptions
    );
    console.log(value)
  };
  return (
    <div className="flex flex-col gap-y-2 mx-1 w-full">
      <p className="font-semibold text-lg">{label}</p>
      <div
        className={`flex flex-col gap-2 border ring-1 ring-slate-300  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-orange-300 focus:shadow-outline ${className} `}
      >
        {selectedOptions.length > 0 && (
          <div className="flex  gap-2 flex-wrap">
            {selectedOptions.map((option) => {
              return (
                <div
                  key={option.label}
                  className="bg-smooth-orange flex-grow-0 text-white font-semibold px-3 py-1 rounded-full flex items-center justify-center gap-x-2 shadow-lg hover:shadow-xl  hover:bg-active-orange transition-all duration-300"
                >
                  <span> {option.label} </span>
                  <span
                    onClick={() => removeOption(option)}
                    title="Remove"
                    className="text-sm font-semibold text-white  cursor-pointer"
                  >
                    {"\u2715"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <select
          onChange={handleSelectChange}
          value=""
          className="focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {unselectedOptions.map((option) => (
            <option key={option.label} value={JSON.stringify(option)}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name].message}</p>
      )}
    </div>
  );
};

export default MutlipleSelect;
