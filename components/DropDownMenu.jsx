import React from "react";

const DropDownMenu = ({ open, menuOptions, onClose }) => {
  return (
    <div
      className={
        "w-max bg-white shadow-md border border-highlight-orange flex flex-col p-1 rounded-sm  gap-1 absolute right-0 text-right " +
        (!open ? "hidden" : "")
      }
    >
      {menuOptions.map((option, index) => (
        <button
          key={option?.label + index}
          onClick={option?.onClick}
          className="text-xs w-full text-left tracking-wide font-medium text-slate-700 max-w-32 truncate ... border-b px-1 py-0.5 rounded-sm hover:bg-slate-100"
        >
          {option?.label}
        </button>
      ))}
    </div>
  );
};

export default DropDownMenu;
