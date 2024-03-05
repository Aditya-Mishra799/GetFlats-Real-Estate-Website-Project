import React from "react";

const Input = ({ label, name, type, errors, register,className, ...rest }) => {
  return (
    <div className="flex flex-col  mx-1">
      <p className="font-semibold text-lg">{label}</p>
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        className={
          "shadow mt-3 appearance-none border ring-1 ring-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-smooth-orange focus:shadow-outline"
        }
        {...rest}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
