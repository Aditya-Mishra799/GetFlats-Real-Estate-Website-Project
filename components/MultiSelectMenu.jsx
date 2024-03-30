import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";

const MultiSelectMenu = ({ options, menuLabel , value = [], setValue}) => {

  const toggleOption = (option) => {
    if (value.includes(option)) {
      if(setValue) setValue(value.filter((item) => item !== option));
    } else {
      if(setValue) setValue([...value, option]);
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left items-center w-full">
      <div className="w-full">
        <div className="flex  gap-1 rounded-md shadow-sm border border-active-orange items-center px-2 py-1  w-full bg-white">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md   bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none grow"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {menuLabel}
          </button>
          <div className="cursor-pointer grow full"
          onClick={()=>setOpen(!open)}
          >
            {!open? <FaAngleDown size={30} /> : <FaAngleUp size={30} /> }
          </div>
        </div>
      </div>

      {open && (
        <div
          className=" mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 w-full"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {options.map((option) => (
            <div key={option.value} className="px-4 py-2">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleOption(option.label)}
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.label)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded accent-active-orange cursor-pointer"
                />
                <label
                  htmlFor={option.value}
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectMenu;
