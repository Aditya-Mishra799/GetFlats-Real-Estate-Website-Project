import React from 'react';

const RangeInput = ({ label, min, max, value = [1000, Infinity], setValue }) => {
  const handleMinChange = (e) => {
    const updateValue = parseInt(e.target.value);
    if (setValue) setValue([updateValue, value[1]]);
  };

  const handleMaxChange = (e) => {
    const updateValue = parseInt(e.target.value);
    if (setValue) setValue([value[0], updateValue]);
  };

  const handleBlur = () => {
    if (value[1] < value[0]) {
      if (setValue) setValue([value[0], value[0]]);
    }
    if (value[0] < min || !value[0] || isNaN(value[0])) {
      if (setValue) setValue([min, value[1]]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            onBlur={handleBlur}
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-active-orange/20 focus:border-active-orange transition-all duration-200"
          />
        </div>
        <div className="flex items-center text-gray-400">to</div>
        <div className="flex-1">
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            onBlur={handleBlur}
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-active-orange/20 focus:border-active-orange transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeInput;