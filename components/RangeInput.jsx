import React, { useState } from 'react';

const RangeInput = ({ label, min, max , value = [1000, Infinity], setValue}) => {
  
  const handleMinChange = (e) => {
    const updateValue = parseInt(e.target.value);
    if ( updateValue >= min) {
      if(setValue) setValue([updateValue, value[1]])
    }
  };

  const handleMaxChange = (e) => {
    const updateValue = parseInt(e.target.value);
    if ( updateValue <= max) {
        if(setValue) setValue([value[0], updateValue])
    }
  };

  const handleBlur= (e) => {
    if(value[0]>value[1]){
      if(setValue) setValue([value[1], value[1]])
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border border-active-orange px-2 py-2 rounded-lg">
      <div className="flex flex-col items-center">
        <label htmlFor={`${label}-min`} className="font-semibold text-md text-slate-600 mb-1">{label}</label>
        <div className='flex gap-2 w-full'>
        <input
          type="number"
          id={`${label}-min`}
          name={`${label}-min`}
          value={value[0]}
          onChange={handleMinChange}
          onBlur = {handleBlur}
          className="text-center border-2 rounded-md w-1/2 px-2 py-1  focus:outline-faded-orange focus:ouline-2 grow"
        />
        <input
          type="number"
          id={`${label}-max`}
          name={`${label}-max`}
          value={value[1]}
          onChange={handleMaxChange}
          onBlur = {handleBlur}
          className="text-center border-2 rounded-md w-1/2 px-2 py-1  focus:outline-faded-orange focus:ouline-2 grow"
        />
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
