import React, {useState} from "react";
const MultiChoice = ({ label, options, className, ...rest }) => {
  const {name, control, onChange, value, errors, ...remaining} = rest
  const [selectedOption, setSelectedOption] = useState(value)
  const clickHandler = (option)=>{
    onChange(option)
    setSelectedOption(option)
  }
  return (
    <div className="flex flex-col gap-y-2 mx-1 w-full">
      <p className="font-semibold text-lg">{label}</p>
      <div className="flex  w-full border-collapse ">
        {options.map((option, index) => {
          const borderStyle =
            index === 0
              ? "border-l-1 rounded-s-lg"
              : index === options.length - 1
              ? "border-r-1 rounded-e-lg"
              : "border-r-1";
          return (
            <span
              className={`border  ${borderStyle} text-center px-1 py-1 border-smooth-orange border-collapse flex-grow hover:bg-active-orange hover:text-orange-50 cursor-pointer transition-all ${option === selectedOption && 'bg-smooth-orange text-white'}`}
              onClick = {()=>clickHandler(option)}
            >
              {option.label}
            </span>
          );
        })}
      </div>
      {errors[name] && <p className="text-red-500 text-xs italic">{errors[name].message}</p>}
    </div>
  );
};

export default MultiChoice;
