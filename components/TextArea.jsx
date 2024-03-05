import React from 'react'

const TextArea = ({ label, name, errors, register,className,rows = 10, ...rest }) => {
  return (
    <div className='w-full'>
    <textarea 
    placeholder = {label}
    rows={rows}
    className = {"shadow appearance-none border ring-1 ring-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-smooth-orange focus:shadow-outline"}
    {...register(name)}
    {...rest}
    />
    {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name].message}</p>
      )}
    </div>
  )
}

export default TextArea
