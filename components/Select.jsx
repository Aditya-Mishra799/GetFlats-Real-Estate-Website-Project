import React, {useState} from 'react';

const Select = ({ label, options, className, ...rest }) => {
  const {name, control, onChange, value, errors, ...remaining} = rest
  const [selectedOption, setSelectedOption] = useState(value)
  const handleChange = (e)=>{
    const selectedOption = JSON.parse(e.target.value);
    onChange(selectedOption)
    setSelectedOption(selectedOption)
  }
  return (
    <div className='flex flex-col gap-2'>
      <p className="font-semibold text-lg">{label}</p>
      <select
        {...rest}
        onChange = {handleChange}
        value = {JSON.stringify(selectedOption)}
        className={`shadow e border ring-1 ring-slate-300  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-smooth-orange focus:shadow-outline ${className} `}
      >
        <option value="" disabled>
            Select an option
          </option>
        {options.map(option => (
          <option key={option.value} value={JSON.stringify(option)} className="appearance-none ">
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Select;
